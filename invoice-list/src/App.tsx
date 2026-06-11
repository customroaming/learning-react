/*
What to build
A page that shows a list of invoices from a hardcoded array, with:

Filter buttons — All / Paid / Unpaid / Overdue
A running total showing the sum of currently visible invoices
A form to add a new invoice (client name, amount, status)
A delete button on each row

That's it. No routing, no API, no database.
*/

import { useState } from "react";

interface Invoice {
    id: number;
    client: string;
    status: "paid" | "unpaid" | "overdue";
    email: string;
    amount: number;
}

const initialInvoices: Invoice[] = [
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
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
    const [status, setStatus] = useState("all");

    const filteredInvoices =
        status === "all"
            ? invoices
            : invoices.filter((invoice) => invoice.status === status);

    const [newName, setNewName] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    const [newStatus, setNewStatus] = useState<"paid" | "unpaid" | "overdue">("paid");
    const [newAmount, setNewAmount] = useState<number>(0);

    function getInvoices() {
        return filteredInvoices.map((invoice) => {
            return (
                <div key={invoice.id} className="Invoice">
                    <p>ID: {invoice.id}</p>
                    <p>Name: {invoice.client}</p>
                    <p>Email: {invoice.email}</p>
                    <p>Amount: {invoice.amount}</p>
                    <p>Status: {invoice.status}</p>
                    <button className="filter-button" onClick={() => deleteInvoice(invoice.id)}>Delete Invoice</button>
                </div>
            );
        });
    }

    function deleteInvoice(id: number) {
        setInvoices(invoices.filter((invoice) => invoice.id !== id));
    }

    function addInvoice() {
        const randomish: number = Date.now() % 1000;
        const newInvoice: Invoice = {
            id: randomish,
            client: newName,
            email: newEmail,
            status: newStatus,
            amount: newAmount,
        }
        const newTest = [...invoices, newInvoice];
        setInvoices(newTest);
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
            <form>
                <input placeholder="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <input placeholder="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value as "paid" | "unpaid" | "overdue")}>
                    <option value="paid">paid</option>
                    <option value="unpaid">unpaid</option>
                    <option value="overdue">overdue</option>
                </select>
                <input placeholder="amount" value={newAmount} onChange={(e) => setNewAmount(Number(e.target.value))} />
                <button className="filter-button" onClick={(e) => {
                    e.preventDefault()
                    addInvoice()
                }}>Submit</button>
            </form>
        </>
    );
}
