import { formatCurrency, formatDate } from "@/lib/utils";

export default function App() {
  const amount = formatCurrency(23.2);
  const date = formatDate(new Date());
  return (
    <>
      <p>{date} </p>
      <p>{amount} </p>
    </>
  );
}
