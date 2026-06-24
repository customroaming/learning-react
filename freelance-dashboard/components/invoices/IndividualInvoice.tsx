"use client";
import { updateInvoiceStatus } from "@/app/invoices/actions";
import getAllInvoices from "@/lib/queries/invoices";
import { invoiceStatuses } from "@/lib/utils";
import { Invoice } from "@/types";
import { useState } from "react";
import ErrorButton from "../ui/ErrorButton";
import { redirect } from "next/navigation";

type IndividualInvoiceProps = {
  invoiceId: string;
  invoices: Awaited<ReturnType<typeof getAllInvoices>>;
  deleteInvoiceAction: (invoiceId: number) => void;
  updateInvoiceAction: (
    invoiceId: number,
    status: Invoice["status"],
  ) => Promise<void>;
};
export default function IndividualInvoice({
  invoices,
  invoiceId,
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
          <div key={invoice.invoices.id} className="text-3xl">
            <p>To: {invoice.clients?.name}</p>
            <p>Amount: £{invoice.invoices.amount}</p>
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
              <p>New Status:</p>
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
