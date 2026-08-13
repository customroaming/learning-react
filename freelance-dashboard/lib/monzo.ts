import { MonzoTransaction } from "@/types";
import { db } from "./db";
import { transactions } from "@/db/schema";

const accountId = process.env.MONZO_ACCOUNT_ID;

async function refreshMonzoAccessToken() {
  const res = await fetch("https://api.monzo.com/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refreh_token",
      client_id: process.env.MONZO_CLIENT_ID!,
      client_secret: process.env.MONZO_CLIENT_SECRET!,
      refresh_token: process.env.MONZO_REFRESH_TOKEN!,
    }),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`failed to refresh monzo token: ${error}`);
  }
  const data = await res.json();
  return data;
}
async function monzoFetch(url: string) {
  let res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.MONZO_ACCESS_TOKEN}`,
    },
  });
  if (res.status !== 401) {
    return res;
  }
  const tokens = await refreshMonzoAccessToken();
  res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });
  return res;
}

export async function getTransactions(): Promise<MonzoTransaction[]> {
  const res = await monzoFetch(
    `https://api.monzo.com/transactions?account_id=${accountId}&expand[]=merchant`,
  );
  if (!res.ok) {
    const error = await res.json();
    console.log("Monzo error:", error);
    throw new Error(`Monzo API error: ${res.status}`);
  }
  const data = await res.json();

  return data.transactions;
}

export async function getBalance() {
  const res = await fetch(
    `https://api.monzo.com/balance?account_id=${accountId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MONZO_ACCESS_TOKEN}`,
      },
    },
  );
  if (!res.ok) throw new Error(`Monzo API error: ${res.status}`);
  const data = await res.json();

  return data;
}

export async function syncTransactions() {
  const allTransactions = await getTransactions();
  await db
    .insert(transactions)
    .values(
      allTransactions.map((transaction) => ({
        date: new Date(transaction.created),
        userId: 1,
        amount: transaction.amount,
        description: transaction.description,
        transactionId: transaction.id,
        category: transaction.category,
        notes: transaction.notes === "" ? "Business" : transaction.notes,
        merchantName: transaction.merchant?.name
          ? transaction.merchant?.name
          : "No Merchant",
        merchantEmoji: transaction.merchant?.emoji
          ? transaction.merchant.emoji
          : "💕",
      })),
    )
    .onConflictDoNothing();
}
