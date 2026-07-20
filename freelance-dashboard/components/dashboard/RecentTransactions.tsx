import { MonzoTransaction } from "@/types";

type RecentTransactionsProps = {
  transactions: MonzoTransaction[];
};

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return transactions.map((transaction) => (
    <p key={transaction.id}>{transaction.description}</p>
  ));
}
