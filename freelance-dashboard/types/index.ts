import { invoices, clients, expenses } from "@/db/schema";

export type Invoice = typeof invoices.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type Expense = typeof expenses.$inferSelect;

//$inferInsert infers data types needed to insert data into db, $inferSelect does the same fo r the data coming out the db.
export type NewInvoice = typeof invoices.$inferInsert;
export type NewClient = typeof clients.$inferInsert;
