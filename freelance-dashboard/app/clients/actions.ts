"use server";
import { clients, invoices } from "@/db/schema";
import { db } from "@/lib/db";
import { Client, NewClient, NewInvoice } from "@/types";
export async function createClient(client: NewClient): Promise<number> {
  const result = db
    .insert(clients)
    .values(client)
    .returning({ id: clients.id })
    .get();

  return result.id;
}

export async function getAllClients(): Promise<Client[]> {
  const result = db.select().from(clients).all();
  return result;
}
