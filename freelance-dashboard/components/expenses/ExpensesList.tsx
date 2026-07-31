"use client";
import { Transaction } from "@/types";
import { useState } from "react";
import SecondaryButtonOutline from "../ui/SecondaryButtonOutline";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { updateNotes } from "@/app/expenses/actions";

type ExpensesListProps = {
  allTransactions: Transaction[];
};
export default function ExpensesList({ allTransactions }: ExpensesListProps) {
  const expenses = allTransactions.filter(
    (transaction) => transaction.amount < 0,
  );
  const categories = [...new Set(expenses.map((e) => e.notes))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lastTaxYear, setLastTaxYear] = useState(false);

  const filteredExpenses = expenses.filter(
    (e) => selectedCategory === "All" || e.notes === selectedCategory,
  );

  const expensesToShow = lastTaxYear
    ? filteredExpenses.filter(
        (expense) => expense.date > new Date("2026-07-15"),
      )
    : filteredExpenses;

  const expenseTotalSum =
    (expensesToShow.reduce((sum, item) => sum + item.amount, 0) / 100) * -1;

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
      <div className="text-2xl">
        Total expenses for {selectedCategory} is £{expenseTotalSum}
      </div>
      <SecondaryButtonOutline
        ctaText="Expenses for last tax year"
        onClick={() => setLastTaxYear((prev) => !prev)}
        active={lastTaxYear === true}
      />
      {expensesToShow.map((transaction) => {
        const amount = transaction.amount / 100;
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(transaction.date || new Date());
        return (
          <div
            key={transaction.id}
            className="flex flex-col gap-4 p-4 rounded-lg border border-outline bg-secondary flex-wrap w-full"
          >
            <div className="flex flex-row gap-4 justify-between">
              <div className="flex flex-row gap-2 items-center">
                {transaction.amount > 0 ? (
                  <BanknoteArrowUp />
                ) : (
                  <BanknoteArrowDown />
                )}
                <span className="text-2xl">{amount}</span>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <div className="flex flex-row gap-2"></div>
                <p>{transaction.merchantEmoji ?? "💼"}</p>
                <p className="text-lg">
                  {transaction.merchantName ?? "No Merchant"}
                </p>
              </div>
            </div>
            <p className="font-manrope">{transaction.description}</p>
            <input
              className="font-manrope"
              defaultValue={
                transaction.notes === "" ? "No Note" : transaction.notes
              }
              onBlur={(e) => updateNotes(e.target.value, transaction.id)}
            />
            <div className="flex opacity-75 flex-row font-manrope italic gap-2">
              <span>{formattedDate}</span>
              <span>•</span>
              <p>{transaction.merchantName ?? "No Merchant"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
