import { useState } from "react";

interface Invoice {
  id: number;
  client: string;
  status: "paid" | "unpaid" | "overdue";
  email: string;
  amount: number;
}

const invoices: Invoice[] = [
  {
    id: 1,
    client: "Will",
    status: "paid",
    email: "wharper200@gmail.com",
    amount: 32.3,
  },
  {
    id: 2,
    client: "Eseld",
    status: "unpaid",
    email: "eseldgmail.com",
    amount: 333,
  },
  {
    id: 3,
    client: "Tom",
    status: "overdue",
    email: "bigdog@gmail.com",
    amount: 69,
  },
  {
    id: 4,
    client: "Dawn",
    status: "paid",
    email: "dawny@gmail.com",
    amount: 63.2,
  },
];

export default function App() {
  const [status, setStatus] = useState("all");
  const filteredInvoices =
    status == "all"
      ? invoices
      : invoices.filter((invoice) => invoice.status == status);

  function getInvoices() {
    return filteredInvoices.map((invoice) => {
      return (
        <div key={invoice.id} className="Invoice">
          <p>ID: {invoice.id}</p>
          <p>Name: {invoice.client}</p>
          <p>Email: {invoice.email}</p>
          <p>Amount: {invoice.amount}</p>
          <p>Status: {invoice.status}</p>
        </div>
      );
    });
  }
  function getAmountTotal() {
    let sum = 0;
    for (let i = 0; i < filteredInvoices.length; i++) {
      sum = sum + filteredInvoices[i].amount;
    }
    return sum;
  }

  return (
    <>
      <div className="button-row">
        <button className="filter-button" onClick={() => setStatus("all")}>
          All
        </button>
        <button className="filter-button" onClick={() => setStatus("paid")}>
          Paid
        </button>
        <button className="filter-button" onClick={() => setStatus("unpaid")}>
          Unpaid
        </button>
        <button className="filter-button" onClick={() => setStatus("overdue")}>
          Overdue
        </button>
      </div>
      {getInvoices()}
      {filteredInvoices.map((invoice) => (
        <div key={invoice.id} className="Invoice">
          <p>
            {invoice.client} - £{invoice.amount}
          </p>
        </div>
      ))}
      <p>Total invoice sum is: £{getAmountTotal()}</p>
    </>
  );
}
