"use client";
import { Transaction } from "@/types";
import { useState } from "react";

type ExpensesListProps = {
  allTransactions: Transaction[];
};
export default function ExpensesList({ allTransactions }: ExpensesListProps) {
  const expenses = allTransactions.filter(
    (transaction) => transaction.amount < 0,
  );
  const categories = [...new Set(expenses.map((e) => e.notes))];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <p>All</p>
        {categories.map((c) => (
          <p key={c}>{c}</p>
        ))}
      </div>
      {expenses.map((transaction) => (
        <p key={transaction.id}>{transaction.notes}</p>
      ))}
    </div>
  );
}
