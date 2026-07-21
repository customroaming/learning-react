"use server";

import { transactions } from "@/db/schema";
import { db } from "@/lib/db";
import { Transaction } from "@/types";
import { eq } from "drizzle-orm";

export async function getDbTransactions(
  id: number = 1,
): Promise<Transaction[]> {
  const allTransactions = db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, id))
    .all();

  return allTransactions;
}
