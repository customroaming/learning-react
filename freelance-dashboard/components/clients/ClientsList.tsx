import { Client } from "@/types";
import SecondaryButton from "../ui/SecondaryButton";
import Link from "next/link";

type ClientListProps = {
  clients: Client[];
};
export default function ClientList({ clients }: ClientListProps) {
  return (
    <div className="flex flex-col text-xl justify-center items-center">
      {clients.map((client) => (
        <div
          key={client.id}
          className="w-full py-4 grid-cols-12 grid border-t border-dashed border-t-onSecondary first:border-none"
        >
          <div className="col-span-3 self-center">Client ID: {client.id}</div>
          <div className="col-span-3 self-center">{client.name}</div>
          <div className="col-span-3 self-center">{client.email}</div>
          <div className=" justify-self-center  self-center col-span-3">
            <Link className="w-fit mx-auto" href={`/clients/${client.id}`}>
              <SecondaryButton ctaText="View" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
