"use client";
import { sendInvoice, updateInvoiceStatus } from "@/app/invoices/actions";
import { getAllInvoices } from "@/lib/queries/invoices";
import { invoiceStatuses } from "@/lib/utils";
import { Invoice, InvoiceItem } from "@/types";
import { useState } from "react";
import ErrorButton from "../ui/ErrorButton";
import { redirect } from "next/navigation";
import SecondaryButton from "../ui/SecondaryButton";
import Link from "next/link";
import StatusBadge from "../ui/StatusBadge";
import SecondaryButtonOutline from "../ui/SecondaryButtonOutline";

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
    <div className="flex font-manrope flex-col gap-8">
      {filteredInvoice.map((invoice) => {
        return (
          <div
            key={invoice.invoices.id}
            className="flex flex-col gap-4 text-md"
          >
            <div className=" flex flex-row justify-between">
              <p className=" text-textSecondary font-semibold align-end leading-normal">
                To: {invoice.clients?.businessName}
              </p>
              <StatusBadge status={invoice.invoices.status} />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-md">Update Status:</p>
              <div className="flex flex-row gap-4">
                <select
                  className="capitalize w-full px-4 py-4 rounded-lg border-outline border bg-surfaceContainer"
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
            <div className="items flex flex-col gap-4 md:hidden">
              <h2 className="text-darkText text-xl font-semibold">
                Invoice Items
              </h2>
              {invoiceItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-2 flex-col p-4 rounded-lg bg-secondary text-onTertiaryContainer"
                >
                  <div className="flex flex-row text-lg font-semibold justify-between">
                    <p>{item.description}</p>
                    <p>£{item.amount}</p>
                  </div>
                  <hr className="text-textTertiary" />
                  <div className="flex text-textSecondary flex-row justify-between">
                    <p>Quantity:</p>
                    <p>{item.quantity}</p>
                  </div>
                  <div className="flex text-textSecondary flex-row justify-between">
                    <p>Unit Price:</p>
                    <p>£{item.unitPrice}</p>
                  </div>
                </div>
              ))}
              <div className="capitalize items-center w-full px-4 py-4 flex flex-row rounded-lg border-outline border bg-surfaceContainer justify-between font-semibold">
                <p className="text-xl">Total:</p>
                <p className="text-3xl font-serif">£{invoice.total}</p>
              </div>
            </div>
            <Link href={`/invoices/${invoice.invoices.id}/pdf`}>
              <SecondaryButtonOutline styles="w-full" ctaText="View Invoice" />
            </Link>
            <SecondaryButtonOutline
              ctaText="Send Invoice"
              onClick={() => sendInvoice(invoice.invoices.id)}
              styles="w-full"
            />
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
              styles="w-full"
            />
          </div>
        );
      })}
    </div>
  );
}
