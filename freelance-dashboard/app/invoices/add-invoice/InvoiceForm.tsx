"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";
import { Client, NewClient, NewInvoice } from "@/types";
import { useState } from "react";

type InvoiceFormProps = {
  clients: Client[];
  createMethodAction: (invoice: NewInvoice) => void;
  createClientAction: (client: NewClient) => Promise<number>;
};

interface LineItem {
  type: "hosting" | "work" | "domain" | "one_off";
  description: string;
  quantity: number;
  unitPrice: number;
}

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

  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      type: "hosting",
      description: "Monthly Web Hosting",
      quantity: 1,
      unitPrice: 15,
    },
  ]);
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

  function updateLineItem(
    index: number,
    field: keyof LineItem,
    value: string | number,
  ) {
    setLineItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  }

  return (
    <form className="invoiceForm shadow-md flex-col flex gap-4 p-8 rounded-lg bg-tertiaryContainer mt-8">
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
      <p className="text-lg">Invoice Items:</p>
      {lineItems.map((item, index) => {
        return (
          <div key={index} className="flex flex-row justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 items-center">
                <label className="text-lg w-30">Type:</label>
                <select
                  value={lineItems[index].type}
                  onChange={(e) => {
                    updateLineItem(index, "type", e.target.value);
                    if (e.target.value !== "work") {
                      updateLineItem(index, "quantity", 1);
                    }
                  }}
                >
                  <option value="hosting">Hosting</option>
                  <option value="one_off">One Off</option>
                  <option value="work">Web Work</option>
                  <option value="domain">Domain Renewal</option>
                </select>
              </div>

              <div className="flex flex-row gap-4 items-center">
                <label className="text-lg w-30">Description:</label>
                <input
                  placeholder="Description"
                  value={lineItems[index].description}
                  onChange={(e) =>
                    updateLineItem(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-row gap-4 items-center">
                <label className="text-lg w-30">Unit Price:</label>
                <input
                  placeholder="Unit Price"
                  value={lineItems[index].unitPrice}
                  onChange={(e) =>
                    updateLineItem(index, "unitPrice", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        );
      })}

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
