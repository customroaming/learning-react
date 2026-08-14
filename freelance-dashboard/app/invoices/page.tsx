import InvoiceTable from "@/components/invoices/InvoiceTable";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Link from "next/link";
import { deleteInvoice, updateInvoiceStatus } from "./actions";
import { Invoice } from "@/types";
import { getAllInvoices } from "@/lib/queries/invoices";
export default async function Invoices() {
  const allInvoices = getAllInvoices();
  function isFilteredInvoiceReal(status: Invoice["status"]) {
    const filterInvoices = allInvoices.filter(
      (invoice) => invoice.invoices.status === status,
    );
    if (filterInvoices.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className="flex flex-row flex-wrap w-full gap-4 items-center pb-24">
      <div className="flex flex-col gap-4 pt-4 w-full md:grid md:grid-cols-2">
        <Link className="w-full" href="/invoices/add-invoice">
          {PrimaryButton({ ctaText: "New Invoice" })}
        </Link>
        <InvoiceTable
          allInvoices={allInvoices}
          updateInvoiceAction={updateInvoiceStatus}
          deleteInvoiceMethod={deleteInvoice}
        />
      </div>
    </div>
  );
}
