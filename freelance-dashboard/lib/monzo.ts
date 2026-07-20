import { MonzoTransaction } from "@/types";

export async function getTransactions(): Promise<MonzoTransaction[]> {
  const accountId = process.env.MONZO_ACCOUNT_ID;
  const res = await fetch(
    `https://api.monzo.com/transactions?account_id=${accountId}&expand[]=merchant`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MONZO_ACCESS_TOKEN}`,
      },
    },
  );
  if (!res.ok) throw new Error(`Monzo API error: ${res.status}`);
  const data = await res.json();

  return data.transactions;
}
