"use client";
import { Client } from "@/types";
import { use, useState } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import ErrorButton from "../ui/ErrorButton";
import SecondaryButton from "../ui/SecondaryButton";

type IndividualClientProps = {
  clientId: string;
  allClients: Client[];
  updateClientAction: (client: Client) => void;
  deleteClientAction: (clientId: number) => void;
};
export default function IndividualClient({
  clientId,
  allClients,
  updateClientAction,
  deleteClientAction,
}: IndividualClientProps) {
  const id = clientId;
  const awaitedClients = allClients;
  const client = awaitedClients.find((client) => client.id === Number(id));

  const [name, setName] = useState(client?.name ?? "");
  const [email, setEmail] = useState(client?.email ?? "");
  const [address, setAdress] = useState(client?.address ?? "");
  const [businessName, setBusinessName] = useState(client?.businessName ?? "");

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  async function showSuccessMessage() {
    setShowSuccess(true);
    await new Promise((r) => setTimeout(r, 2000));
    setShowSuccess(false);
  }

  if (!client) {
    return <p>No client found</p>;
  }
  return (
    <div
      key={client.id}
      className="flex flex-col gap-4 [&_input,textarea]:bg-secondary [&_input,textarea]:p-2 [&_input,textarea]:rounded-lg [&_input,textarea]:text-onSecondary [&>div]:items-center"
    >
      <p className="text-4xl">{client.name}</p>
      <div className="flex flex-row gap-4 text-2xl">
        <label>Name: </label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="flex flex-row gap-4 text-2xl">
        <label>Email: </label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="flex flex-row gap-4 text-2xl">
        <label>Address: </label>
        <textarea value={address} onChange={(e) => setAdress(e.target.value)} />
      </div>
      <div className="flex flex-row gap-4 text-2xl">
        <label>Business Name: </label>
        <input
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-4">
        <PrimaryButton
          ctaText="Update Client"
          isDisabled={isUpdating}
          onClick={(e) => {
            const updatedClient: Client = {
              id: client.id,
              name: name,
              email: email,
              address: address,
              businessName: businessName,
              userId: 1,
              createdAt: null,
            };
            try {
              setIsUpdating(true);
              updateClientAction(updatedClient);
            } finally {
              setIsUpdating(false);
              showSuccessMessage();
            }
          }}
        />
        <SecondaryButton
          ctaText="Delete Client"
          onClick={() => deleteClientAction(client.id)}
        />
      </div>
      {showSuccess && (
        <div className="w-full p-4 rounded-lg bg-tertiaryContainer">
          <p className="text-onTertiaryContainer text-2xl">Details Updated!!</p>
        </div>
      )}
    </div>
  );
}
