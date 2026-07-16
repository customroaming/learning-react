"use client";
import { Client } from "@/types";
import { useState } from "react";

type IndividualClientProps = {
  clientId: string;
  allClients: Client[];
};
export default function IndividualClient({
  clientId,
  allClients,
}: IndividualClientProps) {
  const id = clientId;
  const awaitedClients = allClients;
  const client = awaitedClients.find((client) => client.id === Number(id));

  const [name, setName] = useState(client?.name ?? "");

  if (!client) {
    return <p>No client found</p>;
  }
  return (
    <>
      <div key={client.id} className="flex flex-col gap-4">
        <p className="text-4xl">{client.name}</p>
        <div className="flex flex-row gap-4 text-2xl">
          <label>Name: </label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
    </>
  );
}
