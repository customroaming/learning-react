import { db } from "@/lib/db";
import { users, clients, expenses, invoices, invoiceItems } from "@/db/schema";
import { sql } from "drizzle-orm";
import { formatCurrency } from "@/lib/utils";

const expiry = new Date();

expiry.setDate(expiry.getDate() + 14);

// 1. Clear existing data (reverse order)
//
// delete expenses, invoices, clients, users
db.run(sql`DELETE FROM expenses`);
db.run(sql`DELETE FROM invoice_items`);
db.run(sql`DELETE FROM invoices`);
db.run(sql`DELETE FROM clients`);
db.run(sql`DELETE FROM users`);

db.run(sql`DELETE FROM sqlite_sequence`);

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

const [insertedClientTwo] = db
  .insert(clients)
  .values({
    address: "RH1 5NN",
    businessName: "Sally Harper Yoga Wellbeing",
    userId: insertedUser.id,
    name: "Sally",
    email: "sallyharper@yoga.com",
  })
  .returning()
  .all();

const [invoice] = db
  .insert(invoices)
  .values({
    userId: insertedUser.id,
    clientId: insertedClient.id,
    status: "sent",
    dueDate: expiry,
  })
  .returning()
  .all();

const [invoiceTwo] = db
  .insert(invoices)
  .values({
    userId: insertedUser.id,
    clientId: insertedClientTwo.id,
    status: "paid",
    dueDate: expiry,
  })
  .returning()
  .all();

const invoiceItem = db
  .insert(invoiceItems)
  .values({
    invoiceId: invoice.id,
    description: "hosting fee",
    type: "hosting",
    unitPrice: 15,
    quantity: 3,
    amount: 45,
  })
  .run();

const invoiceItemTwo = db
  .insert(invoiceItems)
  .values({
    invoiceId: invoiceTwo.id,
    description: "hosting fee",
    type: "hosting",
    unitPrice: 15,
    quantity: 3,
    amount: 45,
  })
  .run();

const invoiceItemThree = db
  .insert(invoiceItems)
  .values({
    invoiceId: invoice.id,
    description: "yearly domain renewal",
    type: "domain",
    unitPrice: 22.36,
    quantity: 1,
    amount: 22.36,
  })
  .run();
// 3. Insert 3 clients using that user id, capture their ids

// 4. Insert 6 invoices spread across those clients
//    - mix of statuses: draft, sent, paid, overdue
//    - mix of amounts
//    - sensible due dates (some past, some future)
