"use server";
import { clients, invoices } from "@/db/schema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Invoice, NewClient, NewInvoice } from "@/types";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createInvoice(invoice: NewInvoice) {
  db.insert(invoices).values(invoice).run();
  revalidatePath("/invoices");
  redirect("/invoices");
}

export async function deleteInvoice(invoiceId: number) {
  db.delete(invoices).where(eq(invoices.id, invoiceId)).run();
  revalidatePath("/invoices");
}
export async function updateInvoiceStatus(
  invoiceId: number,
  status: Invoice["status"],
) {
  db.update(invoices).set({ status }).where(eq(invoices.id, invoiceId)).run();
  revalidatePath("/invoices");
  revalidatePath("/invoices/[id]");
}
