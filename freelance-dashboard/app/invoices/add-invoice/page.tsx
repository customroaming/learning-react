import InvoiceForm from "./InvoiceForm";
import { createClient, createInvoice } from "../actions";
import { getAllClients } from "@/lib/queries/clients";

export default async function InvoicePage() {
  const allClients = await getAllClients();

  return (
    <InvoiceForm
      clients={allClients}
      createMethodAction={createInvoice}
      createClientAction={createClient}
    />
  );
}
