import { db } from "@/lib/db";
import { users, clients, invoices, invoiceItems, tokens } from "@/db/schema";
import { sql } from "drizzle-orm";
import { formatCurrency } from "@/lib/utils";

const expiry = new Date();

expiry.setDate(expiry.getDate() + 14);

// 1. Clear existing data (reverse order)
//
// delete expenses, invoices, clients, users
db.run(sql`DELETE FROM transactions`);
db.run(sql`DELETE FROM invoice_items`);
db.run(sql`DELETE FROM invoices`);
db.run(sql`DELETE FROM clients`);
db.run(sql`DELETE FROM users`);
db.run(sql`DELETE FROM tokens`);
db.run(sql`DELETE FROM sqlite_sequence`);

const currentTokens = db
  .insert(tokens)
  .values({
    accessToken:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYiI6IjdFaEY0K1lxVi9GTlZHMFc4OTcwIiwianRpIjoiYWNjdG9rXzAwMDBCOVRJM0x3T0kxMVJwem5HZGUiLCJ0eXAiOiJhdCIsInYiOiI2In0.1flyzvQv784begXJf1bxJ9VNzb_PJQniKGR2jQAtDamqfbB_qOcR0viROcwKUc3FwpfeRSTDHtgCU4TF6_xI4A",
    refreshToken:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYiI6InpqeE5rdnhHUDY2SllyZUhRMU1lIiwianRpIjoicmVmdG9rXzAwMDBCOVRJM00xTHpaUHBkQnRLa3IiLCJ0eXAiOiJydCIsInYiOiI2In0.V1GxXEnvq6w_w8gzCPTdt13gTdYB1Y8pJNopJDyKNxrznvUI2XRcaRmhsK9yjlaXYHrkJDDkRo4HQmRBtr2K8A",
  })
  .run();

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
