import IndividualClient from "@/components/clients/IndividualInvoice";
import { deleteClient, updateClient } from "../actions";
import InvoiceTable from "@/components/invoices/InvoiceTable";
import { getAllInvoices } from "@/lib/queries/invoices";
import { deleteInvoice, updateInvoiceStatus } from "@/app/invoices/actions";
import { getAllClients } from "../queries";

type IndividualClientPageProps = {
  params: Promise<{ id: string }>;
};
export default async function IndividualClientPage({
  params,
}: IndividualClientPageProps) {
  const { id } = await params;
  const clients = getAllClients();
  const allInvoices = getAllInvoices();
  return (
    <div className="flex flex-col gap-8">
      <IndividualClient
        clientId={id}
        allClients={clients}
        updateClientAction={updateClient}
        deleteClientAction={deleteClient}
      />
      <h2 className="text-4xl">All Invoices</h2>
      <InvoiceTable
        allInvoices={allInvoices}
        updateInvoiceAction={updateInvoiceStatus}
        deleteInvoiceMethod={deleteInvoice}
        filterClient={Number(id)}
      />
    </div>
  );
}
