import sendgrid, { MailDataRequired } from "@sendgrid/mail";

import { CreateOrder } from "../types/order";

import MenuItemsService from "./menuItemsService";
import renderEmailFactory from "../utils/renderEmailFactory";

import NovoPedidoEmail from "../../../shared/emails/emails/novo-pedido";
import PedidoEmail from "../../../shared/emails/emails/pedido";
import EntregaEmail from "../../../shared/emails/emails/entrega";

import { Order } from "../models/OrderModel";
import { PaymentMethods } from "../types/PaymentMethods";

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
    value: {
      appFee: number;
      deliveryFee: number;
      itemsTotal: number;
      total: number;
    },
    payment_method: PaymentMethods
  ) => {
    const email = renderEmailFactory(NovoPedidoEmail);

    const html = await email({
      value,
      client: user,
      id: order_id,
      date: new Date(),
      buttonUrl: `${process.env.BACKEND_URL!}/orders/confirm_payment?id=${
        order_id
      }`,
      payment_method,
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
  sendNewOrderToRestaurantEmail: async (
    orderId: string,
    items: Order["items"]
  ) => {
    const email = renderEmailFactory(PedidoEmail);

    const menuItems = await MenuItemsService.getItemsDetails(items);

    const html = await email({
      items: menuItems,
      buttonURL: `${process.env.BACKEND_URL!}/orders/ready_for_delivery?id=${orderId}`,
    });

    const message: MailDataRequired = {
      subject: "Novo pedido no seu restaurante!",
      from: SENDER_EMAIL,
      to: RESTAURANT_EMAIL,
      bcc: SENDER_EMAIL,
      html,
    };

    await sendgrid.send(message);
  },
  sendDeliveryEmail: async (data: { orderId: string; address: string }) => {
    const email = renderEmailFactory(EntregaEmail);

    const html = await email({
      restaurantAddress: "Rua Dom Pedro I, 603",
      clientAddress: data.address,
      date: new Date(),
      buttonUrl: `${process.env.BACKEND_URL!}/orders/delivered?id=${data.orderId}`,
      id: data.orderId,
    });

    const message: MailDataRequired = {
      subject: "Oba, tem entrega nova!",
      from: SENDER_EMAIL,
      to: MOTOBOY_EMAIL,
      bcc: SENDER_EMAIL,
      html,
    };

    await sendgrid.send(message);
  },
};

export default EmailService;
