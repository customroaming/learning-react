import getAllInvoices from "@/components/invoices/AllInvoices";
import invoiceTable from "@/components/invoices/InvoiceTable";
export default async function Invoices() {
  const allInvoices = getAllInvoices();
  return (
    <div className="grid grid-cols-12 items-center">
      <h1 className="text-5xl col-span-6 text-center">All Invoices</h1>
      <div className="col-span-6">{invoiceTable(allInvoices)}</div>
    </div>
  );
}
