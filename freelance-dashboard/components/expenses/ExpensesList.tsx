"use client";
import { Transaction } from "@/types";
import { useState } from "react";
import SecondaryButtonOutline from "../ui/SecondaryButtonOutline";

type ExpensesListProps = {
  allTransactions: Transaction[];
};
export default function ExpensesList({ allTransactions }: ExpensesListProps) {
  const expenses = allTransactions.filter(
    (transaction) => transaction.amount < 0,
  );
  const categories = [...new Set(expenses.map((e) => e.notes))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredExpenses = expenses.filter(
    (e) => selectedCategory === "All" || e.notes === selectedCategory,
  );

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
      <div className="flex flex-row gap-2 md:col-span-2">
        <SecondaryButtonOutline
          ctaText="All"
          active={selectedCategory === "All"}
          onClick={() => setSelectedCategory("All")}
        />
        {categories.map((c) => (
          <SecondaryButtonOutline
            key={c}
            ctaText={c!}
            active={c === selectedCategory}
            onClick={() => setSelectedCategory(c ?? "All")}
          />
        ))}
      </div>
      {filteredExpenses.map((transaction) => (
        <div
          className={`flex flex-col gap-2 rounded-lg bg-secondary border border-outline p-3`}
          key={transaction.id}
        >
          <p>#{transaction.id}</p>
          <p>£{transaction.amount / 100}</p>
          <p>{transaction.description}</p>
          <p>{transaction.date?.toString()}</p>
          <p>#{transaction.transactionId}</p>
          <p>{transaction.notes}</p>
        </div>
      ))}
    </div>
  );
}
