"use server";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getBalance, getTransactions } from "@/lib/monzo";
import CurrentBalance from "@/components/dashboard/CurrentBalance";

export default async function App() {
  const amount = formatCurrency(23.2);
  const date = formatDate(new Date());
  const getAllTransactions = await getTransactions();
  const currentBalance = await getBalance();
  return (
    <>
      <CurrentBalance balance={currentBalance} />
      <RecentTransactions transactions={getAllTransactions} />
    </>
  );
}
