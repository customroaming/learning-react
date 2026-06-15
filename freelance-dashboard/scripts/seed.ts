import { db } from "@/lib/db";
import { users, clients, expenses, invoices } from "@/db/schema";
import { sql } from "drizzle-orm";

// 1. Clear existing data (reverse order)
// delete expenses, invoices, clients, users

// 2. Insert user, capture the id
const [insertedUser] = db
  .insert(users)
  .values({
    name: "Will Harper",
  })
  .returning()
  .all();

const [insertedClient] = db
  .insert(clients)
  .values({
    address: "Aspenshaw Cottage",
    userId: insertedUser.id,
    name: "Eseld",
    email: "eseld@gmail.com",
  })
  .returning()
  .all();
const invoice = db
  .insert(invoices)
  .values({
    amount: 33.24,
    userId: insertedUser.id,
    clientId: insertedClient.id,
    status: "sent",
    dueDate: new Date("2025-12-01"),
  })
  .run();

// 3. Insert 3 clients using that user id, capture their ids

// 4. Insert 6 invoices spread across those clients
//    - mix of statuses: draft, sent, paid, overdue
//    - mix of amounts
//    - sensible due dates (some past, some future)
