import { MonzoTransaction } from "@/types";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

type RecentTransactionsProps = {
  transactions: MonzoTransaction[];
};

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl md:text-3xl">Recent Transactions</h2>
      <div className="flex flex-row flex-wrap gap-4 md:grid-cols-2 md:grid">
        {transactions.map((transaction) => {
          const amount = transaction.amount / 100;
          const formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(transaction.created));
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
                  <p>{transaction.merchant?.emoji ?? "💼"}</p>
                  <p className="text-lg">
                    {transaction.merchant?.name ?? "No Merchant"}
                  </p>
                </div>
              </div>
              <p className="font-manrope">{transaction.description}</p>
              <div className="flex opacity-75 flex-row font-manrope italic gap-2">
                <span>{formattedDate}</span>
                <span>•</span>
                <p>{transaction.merchant?.name ?? "No Merchant"}</p>
                <span>•</span>
                <p>
                  {transaction.notes === "" ? "No Note" : transaction.notes}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
