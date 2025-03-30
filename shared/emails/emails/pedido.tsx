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
import { IMenuItem, menu_doces, menu_salgados } from "../../menu/menu_items";

export const PedidoEmail = ({
  items = [
    {
      id: "1",
      quantity: 2,
    },
    {
      id: "10",
      quantity: 2,
    },
  ],
}: {
  items: { id: string; quantity: number }[];
}) => {
  const itemsList = items.map((item) => {
    const menus = [...menu_doces, ...menu_salgados];
    const menuItem = menus.find((menu) => menu.id === item.id);

    return { ...menuItem, quantity: item.quantity } as IMenuItem & {
      quantity: number;
    };
  });

  return (
    <Html>
      <Head />
      <Preview>Oba! Tem pedido novo!!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            {/* <Img
            src={`/static/stripe-logo.png`}
            width="49"
            height="21"
            alt="Stripe"
          />
          <Hr style={hr} /> */}

            {/* <Section>dsa</Section> */}

            <Text style={title}>Oba! Tem pedido novo!!</Text>

            <Text style={{ ...paragraph, margin: "32px 0" }}>
              Chegou um pedido novo para você! Agora é só produzir e quando
              estiver pronto é só clicar no botão ao final desse email!
            </Text>

            {itemsList.map((item) => (
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
                      {item.quantity} unidades - {item.quantity * item.price}
                    </Text>
                  </Column>
                  <Column align="right">
                    <Img
                      src={`/static/menu${item.imageUrl}`}
                      alt="Image"
                      style={{
                        width: "150px",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  </Column>
                </Row>
              </Section>
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
                    Total: R$ 50,00
                  </Text>
                </Column>
              </Row>
            </Section>

            <Button style={button} href="https://dashboard.stripe.com/login">
              Tudo pronto para o envio!
            </Button>

            {/* <Hr style={hr} />
          <Text style={paragraph}>
            If you haven't finished your integration, you might find our{" "}
            <Link style={anchor} href="https://stripe.com/docs">
              docs
            </Link>{" "}
            handy.
          </Text>
          <Text style={paragraph}>
            Once you're ready to start accepting payments, you'll just need to
            use your live{" "}
            <Link
              style={anchor}
              href="https://dashboard.stripe.com/login?redirect=%2Fapikeys"
            >
              API keys
            </Link>{" "}
            instead of your test API keys. Your account can simultaneously be
            used for both test and live requests, so you can continue testing
            while accepting live payments. Check out our{" "}
            <Link style={anchor} href="https://stripe.com/docs/dashboard">
              tutorial about account basics
            </Link>
            .
          </Text>
          <Text style={paragraph}>
            Finally, we've put together a{" "}
            <Link
              style={anchor}
              href="https://stripe.com/docs/checklist/website"
            >
              quick checklist
            </Link>{" "}
            to ensure your website conforms to card network standards.
          </Text>
          <Text style={paragraph}>
            We'll be here to help you with any step along the way. You can find
            answers to most questions and get in touch with us on our{" "}
            <Link style={anchor} href="https://support.stripe.com/">
              support site
            </Link>
            .
          </Text>
          <Text style={paragraph}>— The Stripe team</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080
          </Text> */}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

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

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
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

const anchor = {
  color: "#556cd6",
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

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};

const menuItem = {
  border: "2px solid #525f7f",
  borderRadius: "5px",
  padding: "10px",
};

const menuItemText = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  margin: "0",
};
