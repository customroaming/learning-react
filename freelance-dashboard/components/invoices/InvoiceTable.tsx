import getAllInvoices from "@/lib/queries/invoices";

interface InvoiceTableProps {
  allInvoices: ReturnType<typeof getAllInvoices>;
}
export default function InvoiceTable({ allInvoices }: InvoiceTableProps) {
  return allInvoices.map((invoice) => {
    return (
      <div
        key={invoice.invoices.id}
        className="invoice col-span-6 p-8 flex bg-tertiaryContainer  heading flex-col rounded-2xl w-full text-onTertiaryContainer"
      >
        <table>
          <tbody>
            <tr>
              <td className="text-2xl">To:</td>
              <td className="text-2xl">
                {invoice.clients?.name} ({invoice.clients?.email})
              </td>
            </tr>
            <tr>
              <td className="text-2xl">Invoice ID:</td>
              <td className="text-2xl">{invoice.invoices.id}</td>
            </tr>
            <tr>
              <td className="text-2xl">Amount:</td>
              <td className="text-2xl">{invoice.invoices.amount}</td>
            </tr>
            <tr>
              <td className="text-2xl">Status:</td>
              <td className="text-2xl">{invoice.invoices.status}</td>
            </tr>
            <tr>
              <td className="text-2xl">Created On</td>
              <td className="text-2xl">
                {invoice.invoices.createdAt
                  ? invoice.invoices.createdAt.toDateString()
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="text-2xl">Due On</td>
              <td className="text-2xl">
                {invoice.invoices.dueDate
                  ? invoice.invoices.dueDate.toDateString()
                  : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });
}
