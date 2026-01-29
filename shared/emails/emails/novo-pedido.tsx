import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";
import numberToCurrency from "../../utils/numberToCurrency";

interface NovoPedidoEmailProps {
  totalValue: number;
  client: {
    email: string;
    phone_number: string;
    address: string;
  };
  id: string;
  date: Date;
  buttonUrl: string;
}
export default function NovoPedidoEmail({
  totalValue = 123,
  client = {
    address: "Rua de Teste 123",
    email: "test@test.com",
    phone_number: "(41) 99999-9999",
  },
  id = "123",
  date = new Date(),
  buttonUrl = "http://localhost:3000/orders/delivered?id=123",
}: NovoPedidoEmailProps) {
  const textInfos = {
    "Valor total": numberToCurrency(totalValue),
    "Email do Cliente": client.email,
    "Telefone do Cliente": client.phone_number,
    "Endereço do Cliente": client.address,
    Data: date.toLocaleDateString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    "id do pedido": id,
  };

  return (
    <Html>
      <Head />
      <Preview>Oba! Novo Pedido!!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={title}>Oba! Tem um pedido novo no app!!</Text>

            <Text style={{ ...paragraph, margin: "32px 0" }}>
              Confira as informações do pedido e confirme o pagamento!
            </Text>

            {Object.entries(textInfos).map(([key, value]) => (
              <Text key={key} style={{ ...paragraph, margin: "16px 0" }}>
                <strong>{key}:</strong> {value}
              </Text>
            ))}

            <Button style={button} href={buttonUrl}>
              Confirmar o pagamento!
            </Button>
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
  color: "#08090d",

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
