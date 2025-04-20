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
import TextLine from "../components/text-line.";

interface MenuItem {
  id: string;
  price: number;
  name: string;
  quantity: number;
}

export const PedidoEmail = ({
  items = [
    {
      id: "1",
      name: "Coxinha",
      price: 10,
      quantity: 2,
    },
    {
      id: "10",
      name: "Crepe",
      price: 20,
      quantity: 2,
    },
  ],
  buttonURL = "http://localhost:3000/orders/ready_for_delivery?id=123",
}: {
  items: MenuItem[];
  buttonURL: string;
}) => {
  const orderTotal = items.reduce((total, item) => {
    return (total += item.price * item.quantity);
  }, 0);

  return (
    <Html>
      <Head />
      <Preview>Oba! Tem pedido novo!!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={title}>Oba! Tem pedido novo!!</Text>

            <TextLine>
              Chegou um pedido novo para você! Agora é só produzir e quando
              estiver pronto é só clicar no botão ao final desse email!
            </TextLine>

            {items.map((item) => (
              <OrderItem item={item} key={item.id} />
            ))}

            <Section style={{ padding: "10px", backgroundColor: "#f9f9f9" }}>
              <Row>
                <Column align="right">
                  <Text
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    Total: {numberToCurrency(orderTotal)}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Button style={button} href={buttonURL}>
              Tudo pronto para o envio!
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

function OrderItem({ item }: { item: MenuItem }) {
  return (
    <Section
      key={item.id}
      style={{
        padding: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        border: "1px solid #ddd",
        margin: "20px 0",
      }}
    >
      <Row>
        <Column align="left" style={{ paddingRight: "10px" }}>
          <Text
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              margin: "4px 0",
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: "14px",
              color: "#555",
              margin: "4px 0000",
            }}
          >
            {item.quantity} unidades -{" "}
            {numberToCurrency(item.quantity * item.price)}
          </Text>
        </Column>
      </Row>
    </Section>
  );
}

export default PedidoEmail;

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
