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
import TextLine from "../components/text-line.";

interface EntregaEmailProps {
  clientAddress: string;
  date: Date;
  buttonUrl: string;
}
export default function EntregaEmail({
  clientAddress = "Aaa",
  date = new Date(),
  buttonUrl = "http://localhost:3000/orders/delivered?id=123",
}: EntregaEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Oba! Tem entrega nova!!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={title}>Oba! Tem entrega nova!!</Text>

            <TextLine>Você tem uma entrega nova para fazer!</TextLine>

            <TextLine>
              <strong>Endereço do restaurante: </strong> Rua Dom Pedro I, 603
            </TextLine>

            <TextLine>
              <strong>Endereço do cliente: </strong> {clientAddress}
            </TextLine>

            <TextLine>
              <strong>Data: </strong>{" "}
              {date.toLocaleDateString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </TextLine>

            <Button style={button} href={buttonUrl}>
              A entrega foi feita com sucesso!
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
