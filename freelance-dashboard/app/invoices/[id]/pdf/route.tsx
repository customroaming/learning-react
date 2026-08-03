import InvoicePDF from "@/components/invoices/pdfs/InvoicePDF";
import { renderToBuffer } from "@react-pdf/renderer";
import { NextRequest } from "next/server";
import { getInvoice } from "../../actions";
import { getClient } from "@/app/clients/actions";
import { getInvoiceItems } from "@/lib/queries/invoices";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const theInvoice = await getInvoice(Number(id));
  if (!theInvoice) {
    return new Response("Invoice Not Found", {
      status: 404,
    });
  }

  const theClient = await getClient(Number(theInvoice?.clientId));
  const allInvoiceItems = getInvoiceItems(Number(id));
  const document = (
    <InvoicePDF
      invoice={theInvoice}
      client={theClient!}
      invoiceItems={allInvoiceItems!}
    />
  );
  const pdf = await renderToBuffer(document);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="invoice-${id}.pdf"`,
    },
  });
}
