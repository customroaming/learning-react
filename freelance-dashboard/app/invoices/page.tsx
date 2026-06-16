import { clients, invoices, users } from "@/db/schema";
import { db } from "@/lib/db";
import { Invoice } from "@/types";
import { eq } from "drizzle-orm";

export default async function Invoices() {
  const allInvoices = db
    .select()
    .from(invoices)
    .leftJoin(users, eq(invoices.userId, users.id))
    .leftJoin(clients, eq(invoices.clientId, clients.id))
    .all();
  function invoiceTable(invoices: typeof allInvoices) {
    return (
      <div className="flex flex-row gap-4">
        {invoices.map((invoice) => {
          return (
            <div
              key={invoice.invoices.id}
              className="invoice p-8 flex heading flex-col rounded-lg w-full text-darkText border-primary border"
            >
              <table>
                <tbody>
                  <tr>
                    <td className="text-2xl">To: {invoice.clients?.name}</td>
                    <td className="text-2xl">
                      Invoice ID: {invoice.invoices.id}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-2xl">
                      Amount: {invoice.invoices.amount}
                    </td>
                    <td className="text-2xl">
                      Status: {invoice.invoices.status}
                    </td>
                  </tr>
                </tbody>
              </table>

              <p>
                {invoice.invoices.createdAt
                  ? invoice.invoices.createdAt.toLocaleString()
                  : ""}
              </p>

              <p>
                {invoice.invoices.dueDate
                  ? invoice.invoices.dueDate.toLocaleString()
                  : ""}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  return invoiceTable(allInvoices);
}
