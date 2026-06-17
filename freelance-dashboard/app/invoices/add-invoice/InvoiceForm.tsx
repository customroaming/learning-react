"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";
import { Client, NewClient, NewInvoice } from "@/types";
import { useState } from "react";

type InvoiceFormProps = {
  clients: Client[];
  createMethodAction: (invoice: NewInvoice) => void;
  createClientAction: (client: NewClient) => Promise<number>;
};

export default function InvoiceForm({
  clients,
  createMethodAction,
  createClientAction,
}: InvoiceFormProps) {
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newAmount, setNewAmount] = useState<number>(0);
  const [newAddress, setNewAddress] = useState<string>("");
  const [newBusinessName, setNewBusinessName] = useState<string | null>("");
  const [selectedClient, setSelectedClient] = useState<string>("new");
  const isExistingClient = selectedClient !== "new";
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  //
  //replace with actual auth when implemented
  //
  const [userId, setUserId] = useState<number>(1);

  const currentDate = new Date();
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 14);

  function handleClientChange(clientId: string) {
    setSelectedClient(clientId);

    if (clientId == "new") {
      setNewName("");
      setNewAddress("");
      setNewEmail("");
      setNewBusinessName("");
      return;
    }
    const client = clients.find((c) => c.id.toString() == clientId);
    if (!client) {
      return;
    }
    setNewName(client.name);
    setNewEmail(client.email);
    setNewAddress(client.address);
    setNewBusinessName(client.businessName);
  }

  function optionClients(clients: Client) {
    return (
      <option key={clients.id} value={clients.id}>
        {clients.name}
      </option>
    );
  }

  return (
    <form>
      <select
        value={selectedClient}
        onChange={(e) => handleClientChange(e.target.value)}
      >
        <option value="new">New Client</option>
        {clients.map(optionClients)}
      </select>
      <input
        placeholder="name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        disabled={isExistingClient}
      />
      <input
        placeholder="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        disabled={isExistingClient}
      />
      <input
        placeholder="address"
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
        disabled={isExistingClient}
      />
      <input
        placeholder="businessName"
        value={newBusinessName ? newBusinessName : ""}
        onChange={(e) => setNewBusinessName(e.target.value)}
        disabled={isExistingClient}
      />
      <input
        placeholder="amount"
        value={newAmount}
        type="number"
        onChange={(e) => setNewAmount(Number(e.target.value))}
      />
      <PrimaryButton
        ctaText="create invoice"
        onClick={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);

          let clientId: number;
          try {
            if (isExistingClient) {
              // Use the already-selected existing client's ID
              clientId = Number(selectedClient);
            } else {
              // Await the server action — it returns the new ID directly
              clientId = await createClientAction({
                name: newName,
                createdAt: currentDate,
                address: newAddress,
                email: newEmail,
                businessName: newBusinessName,
                userId: userId,
              });
            }

            // Build the invoice NOW that we have the real clientId
            const newInvoice: NewInvoice = {
              clientId, // correct ID whether new or existing
              createdAt: currentDate,
              dueDate: expiry,
              status: "sent",
              amount: newAmount,
              userId: userId,
            };

            createMethodAction(newInvoice);
          } finally {
            setIsSubmitting(false);
          }
        }}
        isDisabled={isSubmitting}
      />
      <p>Created on: {currentDate.toDateString()}</p>
      <p>Due on: {expiry.toDateString()}</p>
    </form>
  );
}
