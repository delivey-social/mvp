import sendgrid, { MailDataRequired } from "@sendgrid/mail";

import NovoPedidoEmail from "../../../shared/emails/emails/novo-pedido";
import { CreateOrder } from "../types/order";
import renderEmailFactory from "../utils/renderEmailFactory";

// TODO: Remove hardcoded emails
const SENDER_EMAIL = "admin@comida.app.br";
const DELIVERY_EMAIL =
  process.env.MODE === "PRODUCTION"
    ? "santocrepecwb@gmail.com"
    : "thiagotolotti@gmail.com";
const RESTAURANT_EMAIL =
  process.env.MODE === "PRODUCTION"
    ? "santocrepecwb@gmail.com"
    : "thiagotolotti@gmail.com";
const MOTOBOY_EMAIL = "thiagotolotti@gmail.com";

const EmailService = {
  sendNewOrderEmail: async (
    order_id: string,
    user: CreateOrder["user"],
    total: number
  ) => {
    const email = renderEmailFactory(NovoPedidoEmail);

    const html = await email({
      totalValue: total,
      client: user,
      id: order_id,
      date: new Date(),
      buttonUrl: `${process.env.BACKEND_URL!}/orders/confirm_payment?id=${
        order_id
      }`,
    });

    const message: MailDataRequired = {
      subject: "Oba! Tem pedido novo!",
      from: SENDER_EMAIL,
      to: DELIVERY_EMAIL,
      bcc: SENDER_EMAIL,
      html,
    };

    await sendgrid.send(message);
  },
};

export default EmailService;
