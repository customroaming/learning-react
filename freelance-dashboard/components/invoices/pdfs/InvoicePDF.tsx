import { Client, Invoice, InvoiceItem } from "@/types";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

type InvoicePDFProps = {
  invoice: Invoice;
  client: Client;
  invoiceItems: InvoiceItem[];
};
export default function InvoicePDF({
  invoice,
  client,
  invoiceItems,
}: InvoicePDFProps) {
  return (
    <Document>
      <Page>
        <View>
          <Text>Invoice #{invoice.id}</Text>
        </View>
      </Page>
    </Document>
  );
}
