import { MonzoTransaction } from "@/types";
import { db } from "./db";
import { transactions } from "@/db/schema";

const accountId = process.env.MONZO_ACCOUNT_ID;

export async function getTransactions(): Promise<MonzoTransaction[]> {
  const res = await fetch(
    `https://api.monzo.com/transactions?account_id=${accountId}&expand[]=merchant`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MONZO_ACCESS_TOKEN}`,
      },
    },
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
        merchantName: transaction.merchant?.name,
        merchantEmoji: transaction.merchant?.emoji,
      })),
    )
    .onConflictDoNothing();
}
