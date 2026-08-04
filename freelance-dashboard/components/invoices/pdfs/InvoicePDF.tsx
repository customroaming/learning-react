import path from "path";

import { Client, Invoice, InvoiceItem } from "@/types";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "PlayfairDisplay",
  fonts: [
    {
      src: path.join(
        process.cwd(),
        "public",
        "fonts",
        "PlayfairDisplay-Regular.ttf",
      ),
      fontWeight: "normal",
    },
    {
      src: path.join(
        process.cwd(),
        "public",
        "fonts",
        "PlayfairDisplay-Bold.ttf",
      ),
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Manrope",
  fonts: [
    {
      src: path.join(process.cwd(), "public", "fonts", "Manrope-Regular.ttf"),
      fontWeight: "normal",
    },
    {
      src: path.join(process.cwd(), "public", "fonts", "Manrope-Bold.ttf"),
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Manrope",
    flexDirection: "column",
    gap: 16,
    letterSpacing: -0.5,
  },
  bold: {
    fontWeight: "bold",
  },
  column: {
    flexDirection: "column",
  },
  gapMd: {
    gap: 16,
  },

  heading: {
    fontSize: 36,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  strapline: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  p: {
    fontSize: 16,
    letterSpacing: 0,
  },
});

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
      <Page style={styles.page}>
        <View>
          <Text style={styles.heading}>INVOICE #{invoice.id}</Text>
        </View>
        <View>
          <Text style={styles.strapline}>SOLIRA</Text>
        </View>
        <View style={[styles.row, styles.justifyBetween]}>
          <View style={[styles.column, styles.gapMd]}>
            <Text style={styles.subheading}>BILL TO</Text>
            <View style={[styles.column, styles.p]}>
              <Text style={styles.bold}>{client.name}</Text>
              <Text>{client.address}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.subheading}>FROM</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
