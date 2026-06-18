import IndividualInvoice from "@/components/invoices/IndividualInvoice";
import getAllInvoices from "@/lib/queries/invoices";
import { updateInvoiceStatus } from "../actions";

type IndividualInvoicePageProps = {
  params: Promise<{ id: string }>;
};

export default async function IndividualInvoicePage({
  params,
}: IndividualInvoicePageProps) {
  const { id } = await params;
  const allInvoices = getAllInvoices();

  return (
    <IndividualInvoice
      updateInvoiceAction={updateInvoiceStatus}
      invoices={allInvoices}
      invoiceId={id}
    />
  );
}
