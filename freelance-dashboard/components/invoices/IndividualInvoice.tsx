"use client";
import { updateInvoiceStatus } from "@/app/invoices/actions";
import { getAllInvoices } from "@/lib/queries/invoices";
import { invoiceStatuses } from "@/lib/utils";
import { Invoice, InvoiceItem } from "@/types";
import { useState } from "react";
import ErrorButton from "../ui/ErrorButton";
import { redirect } from "next/navigation";
import SecondaryButton from "../ui/SecondaryButton";
import Link from "next/link";

type IndividualInvoiceProps = {
  invoiceId: string;
  invoices: Awaited<ReturnType<typeof getAllInvoices>>;
  invoiceItems: InvoiceItem[];
  deleteInvoiceAction: (invoiceId: number) => void;
  updateInvoiceAction: (
    invoiceId: number,
    status: Invoice["status"],
  ) => Promise<void>;
};
export default function IndividualInvoice({
  invoices,
  invoiceId,
  invoiceItems,
  updateInvoiceAction,
  deleteInvoiceAction,
}: IndividualInvoiceProps) {
  const id = invoiceId;
  const [isDeleting, setIsDeleting] = useState(false);
  const filteredInvoice = invoices.filter(
    (invoice) => invoice.invoices.id === Number(id),
  );

  const specificInvoice = invoices.find(
    (invoice) => invoice.invoices.id === Number(id),
  );
  const [currentStatus, setCurrentStatus] = useState(
    specificInvoice?.invoices.status ?? "sent",
  );
  function handleStatusUpdate(id: number, status: Invoice["status"]) {
    updateInvoiceAction(id, status);
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl">Invoice ID: #{id}</h1>
      {filteredInvoice.map((invoice) => {
        return (
          <div
            key={invoice.invoices.id}
            className="flex flex-col gap-2 text-3xl"
          >
            <p>To: {invoice.clients?.name}</p>

            <p>
              Status:
              <span
                className={
                  invoice.invoices.status === "paid"
                    ? "text-green-800"
                    : "text-error"
                }
              >
                {" "}
                {currentStatus}
              </span>
            </p>
            <div className="flex flex-row gap-4">
              <p>Update Status:</p>
              <select
                onChange={(e) => {
                  const newStatus = e.target.value as Invoice["status"];
                  setCurrentStatus(newStatus);
                  handleStatusUpdate(Number(id), newStatus);
                }}
              >
                <option value={currentStatus}>{currentStatus}</option>
                {invoiceStatuses.map((status) => {
                  if (status === invoice.invoices.status) {
                    return;
                  }
                  return (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full ">
                <thead>
                  <tr className="text-left">
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>£{item.unitPrice}</td>
                      <td>£{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="items flex flex-col gap-2 md:hidden">
              {invoiceItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-1 flex-col p-2 rounded-lg bg-tertiaryContainer text-onTertiaryContainer"
                >
                  <div className="flex flex-row justify-between">
                    <p>{item.description}</p>
                    <p>£{item.amount}</p>
                  </div>
                  <hr className="text-outline" />
                  <div className="flex flex-row justify-between">
                    <p>Quantity:</p>
                    <p>{item.quantity}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>Unit Price:</p>
                    <p>£{item.unitPrice}</p>
                  </div>
                </div>
              ))}
              <p>Amount: £{invoice.total}</p>
            </div>
            <Link href={`/invoices/${invoice.invoices.id}/pdf`}>
              <SecondaryButton ctaText="View Invoice" />
            </Link>
            <ErrorButton
              ctaText="delete invoice"
              onClick={async (e) => {
                setIsDeleting(true);
                try {
                  deleteInvoiceAction(invoice.invoices.id);
                } finally {
                  setIsDeleting(false);
                  redirect("/invoices");
                }
              }}
              isDisabled={isDeleting}
            />
          </div>
        );
      })}
    </div>
  );
}
