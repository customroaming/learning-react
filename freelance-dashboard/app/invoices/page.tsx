import InvoiceTable from "@/components/invoices/InvoiceTable";
import PrimaryButton from "@/components/ui/PrimaryButton";
import getAllInvoices from "@/lib/queries/invoices";
import Link from "next/link";
import { deleteInvoice, updateInvoiceStatus } from "./actions";
import { Invoice } from "@/types";
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
      <div className="flex flex-col gap-4 pt-4 w-full">
        <div
          className={`flex flex-col gap-4 w-full ${isFilteredInvoiceReal("overdue") ? "" : "hidden"}`}
        >
          <h2 className="text-2xl">overdue</h2>
          <InvoiceTable
            allInvoices={allInvoices}
            updateInvoiceAction={updateInvoiceStatus}
            deleteInvoiceMethod={deleteInvoice}
            filterStatus="overdue"
          />
          <div className="w-full h-0.5 bg-outline/10 my-4"></div>
        </div>
        <div
          className={`flex flex-col gap-4 w-full ${isFilteredInvoiceReal("sent") ? "" : "hidden"}`}
        >
          <h2 className="text-2xl">sent</h2>
          <InvoiceTable
            allInvoices={allInvoices}
            updateInvoiceAction={updateInvoiceStatus}
            deleteInvoiceMethod={deleteInvoice}
            filterStatus="sent"
          />
          <div className="w-full h-0.5 bg-outline/10 my-4"></div>
        </div>
        <div
          className={`flex flex-col gap-4 w-full ${isFilteredInvoiceReal("paid") ? "" : "hidden"}`}
        >
          <h2 className="text-2xl">paid</h2>
          <InvoiceTable
            allInvoices={allInvoices}
            updateInvoiceAction={updateInvoiceStatus}
            deleteInvoiceMethod={deleteInvoice}
            filterStatus="paid"
          />
          <div className="w-full h-0.5 bg-outline/10 my-4"></div>
        </div>
        <h2 className="text-2xl">all</h2>
        <InvoiceTable
          allInvoices={allInvoices}
          updateInvoiceAction={updateInvoiceStatus}
          deleteInvoiceMethod={deleteInvoice}
        />
        <Link className="w-fit mx-auto" href="/invoices/add-invoice">
          {PrimaryButton({ ctaText: "add invoice" })}
        </Link>
      </div>
    </div>
  );
}
