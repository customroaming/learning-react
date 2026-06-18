import InvoiceTable from "@/components/invoices/InvoiceTable";
import PrimaryButton from "@/components/ui/PrimaryButton";
import getAllInvoices from "@/lib/queries/invoices";
import Link from "next/link";
import { deleteInvoice } from "./actions";
export default async function Invoices() {
  const allInvoices = getAllInvoices();
  return (
    <div className="flex flex-row flex-wrap gap-4 items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl text-center">All Invoices</h1>
        <Link className="w-fit mx-auto" href="/invoices/add-invoice">
          {PrimaryButton({ ctaText: "add invoice" })}
        </Link>
      </div>
      <InvoiceTable
        allInvoices={allInvoices}
        deleteInvoiceMethod={deleteInvoice}
      />
    </div>
  );
}
