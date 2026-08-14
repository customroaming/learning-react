import { MonzoTransaction } from "@/types";

type RecentTransactionsProps = {
  transactions: MonzoTransaction[];
};

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl font-manrope">
        Recent Transactions
      </h2>
      <div className="flex flex-row flex-wrap gap-4 md:grid-cols-2 md:grid">
        {transactions.reverse().map((transaction) => {
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
              className="flex flex-col gap-2 p-4 rounded-lg border border-outline bg-surfaceContainer flex-wrap w-full font-manrope tracking-tight"
            >
              <div className="flex flex-row gap-4 justify-between">
                <div
                  className={`flex flex-row gap-0 items-center text-2xl ${transaction.amount > 0 ? "text-onPaid" : "text-darkText"}`}
                >
                  {transaction.amount > 0 ? "+" : "-"}
                  <span className={`text-2xl font-semibold `}>
                    £{Math.abs(amount).toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <div className="flex flex-row gap-2"></div>
                  <p>{transaction.merchant?.emoji ?? "💼"}</p>
                  <p className="text-lg text-textSecondary">
                    {transaction.merchant?.name ?? "No Merchant"}
                  </p>
                </div>
              </div>
              <p className="font-manrope">{transaction.description}</p>
              <div className="flex opacity-75 flex-row font-manrope text-textTertiary gap-2">
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
