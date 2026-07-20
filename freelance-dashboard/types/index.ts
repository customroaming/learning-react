import { invoices, clients, expenses, invoiceItems } from "@/db/schema";

export type Invoice = typeof invoices.$inferSelect;
export type InvoiceItem = typeof invoiceItems.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type Expense = typeof expenses.$inferSelect;

//$inferInsert infers data types needed to insert data into db, $inferSelect does the same fo r the data coming out the db.
export type NewInvoice = typeof invoices.$inferInsert;
export type NewClient = typeof clients.$inferInsert;
export type NewInvoiceItem = typeof invoiceItems.$inferInsert;

export interface LineItem {
  type: "hosting" | "work" | "domain" | "one_off";
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface MonzoTransaction {
  id: string;
  created: string;
  description: string;
  amount: number;
  notes: string;
  settled: string;
  merchant: MonzoMerchant | null;
}

export interface MonzoMerchant {
  id: string;
  name: string;
  category: string;
  logo: string;
  emoji: string;
}

export interface MonzoBalance {
  balance: number;
  total_balance: number;
  spend_today: number;
}
