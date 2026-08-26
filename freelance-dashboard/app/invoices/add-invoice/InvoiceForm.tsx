"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";
import {
  Client,
  LineItem,
  NewClient,
  NewInvoice,
  NewInvoiceItem,
} from "@/types";
import { Cross, Plus, X } from "lucide-react";
import { useState } from "react";
import { getLatestInvoice } from "../actions";
import TextInput from "@/components/ui/TextInput";
import TextAreaInput from "@/components/ui/TextAreaInput";

type InvoiceFormProps = {
  clients: Client[];
  createMethodAction: (invoice: NewInvoice, items: LineItem[]) => void;
  createClientAction: (client: NewClient) => Promise<number>;
};

export default function InvoiceForm({
  clients,
  createMethodAction,
  createClientAction,
}: InvoiceFormProps) {
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
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

  const total = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
  //
  //replace with actual auth when implemented
  //
  const [userId, setUserId] = useState<number>(1);

  const currentDate = new Date();
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 14);

  async function handleClientChange(clientId: string) {
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

    const previousItems = await getLatestInvoice(Number(clientId));
    setLineItems(previousItems);
  }

  function optionClients(clients: Client) {
    return (
      <option key={clients.id} value={clients.id}>
        {clients.name}
      </option>
    );
  }

  function removeLineItem(index: number) {
    setLineItems((prev) => prev.filter((item, i) => i !== index));
  }
  function addLineItem() {
    setLineItems((prev) => [
      ...prev,
      {
        type: "hosting",
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
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
    <form className="invoiceForm font-manrope shadow-md flex-col flex gap-4 p-8 rounded-lg bg-tertiaryContainer mt-8">
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Client</label>
        <select
          className="bg-surfaceContainer border border-outline rounded-lg"
          value={selectedClient}
          onChange={(e) => handleClientChange(e.target.value)}
        >
          <option value="new">New Client</option>
          {clients.map(optionClients)}
        </select>
      </div>
      <TextInput
        placeholderProp="Client Name"
        onChangeProp={(e) => setNewName(e.target.value)}
        isDisabled={isExistingClient}
        valueProp={newName}
        label="Name"
      />
      <TextInput
        label="Email"
        onChangeProp={(e) => setNewEmail(e.target.value)}
        isDisabled={isExistingClient}
        valueProp={newEmail}
        placeholderProp="client@company.com"
      />
      <TextInput
        placeholderProp="Billing address"
        valueProp={newAddress}
        isDisabled={isExistingClient}
        onChangeProp={(e) => setNewAddress(e.target.value)}
        label="Address"
      />
      <TextAreaInput
        placeholderProp="Company name"
        valueProp={newBusinessName ? newBusinessName : ""}
        isDisabled={isExistingClient}
        onChangeProp={(e) => setNewBusinessName(e.target.value)}
        label="Business Name"
      />
      <p className="text-lg">Invoice Items:</p>
      {lineItems.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-row justify-between items-center p-8 bg-secondary rounded-2xl"
          >
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Type</label>
                <select
                  className="bg-surfaceContainer border border-outline rounded-lg"
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

              <TextInput
                placeholderProp="Description"
                valueProp={lineItems[index].description}
                onChangeProp={(e) =>
                  updateLineItem(index, "description", e.target.value)
                }
                label="Description"
              />
              <TextInput
                placeholderProp="Unit Price"
                label="Unit Price"
                valueProp={lineItems[index].unitPrice}
                onChangeProp={(e) =>
                  updateLineItem(index, "unitPrice", Number(e.target.value))
                }
              />
              {lineItems[index].type === "work" && (
                <TextInput
                  placeholderProp="Quantity"
                  typeProp="number"
                  label="Quantity"
                  valueProp={lineItems[index].quantity}
                  onChangeProp={(e) =>
                    updateLineItem(index, "quantity", Number(e.target.value))
                  }
                />
              )}
            </div>
            <X
              className="cursor-pointer hover:scale-120 transition-all"
              size={32}
              onClick={() => removeLineItem(index)}
            />
          </div>
        );
      })}
      <Plus
        size={32}
        className="text-black rounded-full bg-background hover:scale-110 cursor-pointer"
        onClick={() => {
          addLineItem();
        }}
      />
      <div className="flex flex-row justify-between items-center p-8 bg-background rounded-lg">
        <span className="text-xl font-bold">Total: {total}</span>
      </div>
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
              userId: userId,
            };

            createMethodAction(newInvoice, lineItems);
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
