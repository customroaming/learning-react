import ClientList from "@/components/clients/ClientsList";
import { getAllClients } from "@/lib/queries/clients";

export default async function Invoices() {
  const allClients = await getAllClients();
  return <ClientList clients={allClients} />;
}
