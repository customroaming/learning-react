"use client";
import { getAllInvoices } from "@/lib/queries/invoices";
import { useState } from "react";
import Link from "next/link";
import { Invoice } from "@/types";
import { invoiceStatuses } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";

interface InvoiceTableProps {
  allInvoices: ReturnType<typeof getAllInvoices>;
  deleteInvoiceMethod: (invoiceId: number) => void;
  filterStatus?: Invoice["status"];
  filterClient?: Invoice["clientId"];
  updateInvoiceAction: (
    invoiceId: number,
    status: Invoice["status"],
  ) => Promise<void>;
}
export default function InvoiceTable({
  allInvoices,
  updateInvoiceAction,
  filterStatus,
  filterClient,
}: InvoiceTableProps) {
  function getDueDaysRemaining(dueDate: Date) {
    const dateNow = new Date();
    const remainingDateMilli = dueDate.valueOf() - dateNow.valueOf();
    const remainingDate = remainingDateMilli / (1000 * 60 * 60 * 24);
    return remainingDate.toFixed(0);
  }
  function handleStatusUpdate(id: number, status: Invoice["status"]) {
    updateInvoiceAction(id, status);
  }
  if (filterStatus) {
    allInvoices = allInvoices.filter(
      (invoice) => invoice.invoices.status === filterStatus,
    );
  }
  if (filterClient) {
    allInvoices = allInvoices.filter(
      (invoice) => invoice.invoices.clientId === filterClient,
    );
  }
  return allInvoices.map((invoice) => {
    const statusColour = (() => {
      if (invoice.invoices.status === "paid")
        return "border-green-700/50 text-green-700";
      if (invoice.invoices.status === "sent") return "border-outline/50";
      if (invoice.invoices.status === "draft") return "border-outline/50";
      if (invoice.invoices.status === "overdue")
        return "border-error/50 text-error";
    })();
    return (
      <div
        key={invoice.invoices.id}
        className={`invoice p-4 flex bg-secondary heading flex-col gap-0.5 rounded-2xl w-full text-onSecondary border relative ${statusColour}`}
      >
        <span className="text-onTertiaryContainer/50 text-lg italic font-[Helvetica]">
          #{invoice.invoices.id}
        </span>
        <div className="absolute right-4 top-4">
          <Link href={`/invoices/${invoice.invoices.id}`}>
            <MoveUpRight className="w-10 h-10 text-outline" />
          </Link>
        </div>
        <h3 className="font-[Helvetica] text-xl">{invoice.clients?.name}</h3>
        <h4 className={`font-[Helvetica] font-bold text-4xl ${statusColour}`}>
          £{invoice.total}
        </h4>
        <h4 className="font-[Helvetica] text-xl">
          due in {getDueDaysRemaining(invoice.invoices.dueDate!)} days |{" "}
          {
            <select
              onChange={(e) => {
                const newStatus = e.target.value as Invoice["status"];
                handleStatusUpdate(Number(invoice.invoices.id), newStatus);
              }}
            >
              <option value={invoice.invoices.status}>
                {invoice.invoices.status}
              </option>
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
          }
        </h4>
      </div>
    );
  });
}

/*
 *
 * old code for table
 
        <table>
          <tbody>
            <tr>
              <td className="text-2xl">To:</td>
              <td className="text-2xl">
                {invoice.clients?.name} ({invoice.clients?.email})
              </td>
            </tr>
            <tr>
              <td className="text-2xl">Invoice ID:</td>
              <td className="text-2xl">{invoice.invoices.id}</td>
            </tr>
            <tr>
              <td className="text-2xl">Amount:</td>
              <td className="text-2xl">{invoice.invoices.amount}</td>
            </tr>
            <tr>
              <td className="text-2xl">Status:</td>
              <td className="text-2xl">{invoice.invoices.status}</td>
            </tr>
            <tr>
              <td className="text-2xl">Created On</td>
              <td className="text-2xl">
                {invoice.invoices.createdAt
                  ? invoice.invoices.createdAt.toDateString()
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="text-2xl">Due On</td>
              <td className="text-2xl">
                {invoice.invoices.dueDate
                  ? invoice.invoices.dueDate.toDateString()
                  : ""}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex flex-row gap-4">
          <Link href={`/invoices/${invoice.invoices.id}`}>
            <SecondaryButton ctaText="view invoice" />
          </Link>
          <ErrorButton
            ctaText="delete invoice"
            onClick={async (e) => {
              setIsDeleting(true);
              try {
                deleteInvoiceMethod(invoice.invoices.id);
              } finally {
                setIsDeleting(false);
              }
            }}
            isDisabled={isDeleting}
          />
        </div>
        */
