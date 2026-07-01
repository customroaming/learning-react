"use server";
import { clients, invoiceItems, invoices } from "@/db/schema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Invoice, NewClient, NewInvoice, NewInvoiceItem } from "@/types";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createInvoice(
  invoice: NewInvoice,
  items: NewInvoiceItem[],
) {
  const [inserted] = db.insert(invoices).values(invoice).returning().all();
  db.insert(invoiceItems)
    .values(items.map((item) => ({ ...item, invoiceId: inserted.id })))
    .run();
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
