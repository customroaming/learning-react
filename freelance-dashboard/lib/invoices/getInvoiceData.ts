import { getClient } from "@/app/clients/actions";
import { getInvoice } from "@/app/invoices/actions";
import { getInvoiceItems } from "../queries/invoices";
import { GenerateInvoicePDFProps } from "../pdf/generateInvoicePdf";

export function getInvoiceData(id: number): GenerateInvoicePDFProps {
  const theInvoice = getInvoice(Number(id));
  if (!theInvoice) {
    throw new Error("Invoice Not Found");
  }

  const theClient = getClient(Number(theInvoice?.clientId));
  if (!theClient) {
    throw new Error("Client not found");
  }
  const allInvoiceItems = getInvoiceItems(Number(id));
  return {
    theInvoice,
    theClient,
    allInvoiceItems,
  };
}
