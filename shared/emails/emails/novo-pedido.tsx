import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import numberToCurrency from "../../utils/numberToCurrency";
import TextLine from "../components/text-line.";
import { PaymentMethods } from "../../../backend/src/types/PaymentMethods";

const HumanReadablePaymentMethods: Record<PaymentMethods, string> = {
  CREDIT_CARD: "Cartão de crédito (entrega)",
  DEBIT_CARD: "Cartão de débito (entrega)",
  PIX: "Pix",
};

interface NovoPedidoEmailProps {
  value: {
    itemsTotal: number;
    appFee: number;
    deliveryFee: number;
    total: number;
  };
  client: {
    email: string;
    phone_number: string;
    address: string;
  };
  id: string;
  date: Date;
  buttonUrl: string;
  payment_method: PaymentMethods;
}
export default function NovoPedidoEmail({
  client = {
    address: "Rua de Teste 123",
    email: "test@test.com",
    phone_number: "(41) 99999-9999",
  },
  id = "67ff01c7dabc890de9bc643f",
  date = new Date(),
  buttonUrl = "http://localhost:3000/orders/delivered?id=123",
  value = {
    deliveryFee: 8,
    appFee: 12.3,
    itemsTotal: 123,
    total: 143.3,
  },
  payment_method = PaymentMethods.CREDIT_CARD,
}: NovoPedidoEmailProps) {
  const userInfos = {
    Email: client.email,
    Telefone: client.phone_number,
    Endereço: client.address,
  };
  const billInfos = {
    "Total dos itens": value.itemsTotal,
    "Taxa comida.app": value.appFee,
    "Taxa de entrega": value.deliveryFee,
  };

  return (
    <Html>
      <Head />
      <Preview>Oba! Pedido novo no comida.app!!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={title}>Oba! Pedido novo no comida.app!!</Text>

            <TextLine>Confira as informações do pedido!</TextLine>

            <TextLine>
              <strong>Obs: </strong>Em caso de pagamento pelo aplicativo só
              confirme após o recebimento.
            </TextLine>

            <Hr style={{ margin: "24px 0", textAlign: "right" }} />

            <Text style={{ ...title, marginTop: "24px", fontSize: "16px" }}>
              Resumo do Pedido
            </Text>

            <TextLine>
              <strong>Data: </strong>
              {date.toLocaleDateString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </TextLine>

            <TextLine>
              <strong>Pagamento: </strong>
              {HumanReadablePaymentMethods[payment_method]}
            </TextLine>

            {Object.entries(billInfos).map(([key, value]) => (
              <TextLine
                key={key}
                style={{ textAlign: "right", fontSize: "14px" }}
              >
                <strong>{key}:</strong> {numberToCurrency(value)}
              </TextLine>
            ))}

            <Section
              style={{
                backgroundColor: "#ffe5e5",
                padding: "8px 12px",
                borderRadius: "5px",
              }}
            >
              <TextLine
                style={{
                  color: "#ab0020",
                  textAlign: "right",
                  margin: "0",
                  fontSize: "14px",
                }}
              >
                <strong>Total: {numberToCurrency(value.total)}</strong>
              </TextLine>
            </Section>

            <Hr style={{ margin: "24px 0" }} />

            <Text style={{ ...title, marginTop: "24px", fontSize: "16px" }}>
              Dados do cliente
            </Text>

            {Object.entries(userInfos).map(([key, value]) => (
              <Text key={key} style={{ ...paragraph, margin: "16px 0" }}>
                <strong>{key}:</strong> {value}
              </Text>
            ))}

            <Button style={button} href={buttonUrl}>
              Confirmar os dados do pedido!
            </Button>

            <Text
              style={{ ...paragraph, fontSize: "12px", textAlign: "right" }}
            >
              {id}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};
const title = {
  color: "#282e3e",

  fontSize: "24px",
  lineHeight: "32px",
  fontWeight: "bold",
  textAlign: "left" as const,
};

const button = {
  backgroundColor: "#ab0020",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px 0",
  marginTop: "36px",
};
