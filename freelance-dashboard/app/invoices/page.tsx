import InvoiceTable from "@/components/invoices/InvoiceTable";
import PrimaryButton from "@/components/ui/PrimaryButton";
import getAllInvoices from "@/lib/queries/invoices";
import Link from "next/link";
export default async function Invoices() {
  const allInvoices = getAllInvoices();
  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-6 flex flex-col gap-4">
        <h1 className="text-5xl text-center">All Invoices</h1>
        <Link className="w-fit mx-auto" href="/invoices/add-invoice">
          {PrimaryButton({ ctaText: "add invoice" })}
        </Link>
      </div>
      <InvoiceTable allInvoices={allInvoices} />
    </div>
  );
}
