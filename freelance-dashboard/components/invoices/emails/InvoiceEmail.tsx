import { Client, Invoice, InvoiceItem } from "@/types";
import { Body, Container, Heading, Html, Text } from "@react-email/components";

type InvoiceEmailProps = {
  invoice: Invoice;
  client: Client;
  invoiceItems: InvoiceItem[];
};
export default function InvoiceEmail({
  invoice,
  client,
  invoiceItems,
}: InvoiceEmailProps) {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>Invoice #{invoice.id}</Heading>

          <Text>Hi {client.name},</Text>

          <Text>Thanks for your business. Your invoice is attached.</Text>

          <Text>
            Total: £
            {invoiceItems
              .reduce((sum, item) => sum + item.amount, 0)
              .toFixed(2)}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
