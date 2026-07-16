import IndividualClient from "@/components/clients/IndividualInvoice";
import { getAllClients } from "../actions";

type IndividualClientPageProps = {
  params: Promise<{ id: string }>;
};
export default async function IndividualClientPage({
  params,
}: IndividualClientPageProps) {
  const { id } = await params;
  const clients = await getAllClients();
  return <IndividualClient clientId={id} allClients={clients} />;
}
