"use server";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { formatCurrency, formatDate } from "@/lib/utils";
import { GET } from "../api/monzo/transactions/route";
import { MonzoTransaction } from "@/types";
import { getTransactions } from "@/lib/monzo";

export default async function App() {
  const amount = formatCurrency(23.2);
  const date = formatDate(new Date());
  const getAllTransactions = await getTransactions();
  return (
    <>
      <RecentTransactions transactions={getAllTransactions} />
    </>
  );
}
