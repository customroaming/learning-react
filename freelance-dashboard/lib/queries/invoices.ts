import { clients, invoices, users } from "@/db/schema";
import { db } from "@/lib/db";
import { asc, desc, eq } from "drizzle-orm";
export default function getAllInvoices() {
  const allInvoices = db
    .select()
    .from(invoices)
    .leftJoin(users, eq(invoices.userId, users.id))
    .leftJoin(clients, eq(invoices.clientId, clients.id))
    .orderBy(desc(invoices.dueDate))
    .all();
  return allInvoices;
}
