"use client";
import getAllInvoices from "@/lib/queries/invoices";
import SecondaryButton from "../ui/SecondaryButton";
import ErrorButton from "../ui/ErrorButton";
import { useState } from "react";
import Link from "next/link";

interface InvoiceTableProps {
  allInvoices: ReturnType<typeof getAllInvoices>;
  deleteInvoiceMethod: (invoiceId: number) => void;
}
export default function InvoiceTable({
  allInvoices,
  deleteInvoiceMethod,
}: InvoiceTableProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  return allInvoices.map((invoice) => {
    return (
      <div
        key={invoice.invoices.id}
        className="invoice col-span-6 p-8 flex bg-tertiaryContainer  heading flex-col gap-4 rounded-2xl w-full text-onTertiaryContainer border border-outline/20"
      >
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
      </div>
    );
  });
}
