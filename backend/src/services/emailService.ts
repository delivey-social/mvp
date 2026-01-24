import { CreateOrderDTO } from "../types/order";

import renderEmailFactory from "../utils/renderEmailFactory";

import NovoPedidoEmail from "../../../shared/emails/emails/novo-pedido";
import PedidoEmail from "../../../shared/emails/emails/pedido";
import EntregaEmail from "../../../shared/emails/emails/entrega";

import { OrderDocument } from "../models/OrderModel";
import menuJSON from "../../public/menu_items.json";
import transporter from "../config/emails";
import OrderService from "./orderService";

import humanReadablePaymentMethod from "../constants/humanReadablePaymentMethod";

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
    user: CreateOrderDTO["user"],
    total: number,
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

    await transporter.sendMail({
      subject: "Oba! Tem pedido novo!",
      from: SENDER_EMAIL,
      to: DELIVERY_EMAIL,
      bcc: SENDER_EMAIL,
      html,
    });
  },
  sendNewOrderToRestaurantEmail: async (
    orderId: string,
    items: OrderDocument["items"],
  ) => {
    const email = renderEmailFactory(PedidoEmail);

    const menuItems = items.map((item) => {
      const menu = Object.values(menuJSON).flat();
      const menuItem = menu.find((menuItem) => item.id === menuItem.id);

      if (!menuItem) {
        throw new Error(`Menu item not found, ${item}`);
      }

      return { ...menuItem, quantity: item.quantity, price: menuItem.price };
    });

    const order = await OrderService.getOrder(orderId);

    if (!order) {
      throw new Error("order not found");
    }

    const appFee = order.totalAmount * 0.1;
    const deliveryFee = order.deliveryFee;

    const html = await email({
      items: menuItems,
      deliveryAddress: order.user.address,
      paymentMethod: humanReadablePaymentMethod[order.paymentMethod],
      appFee: appFee,
      deliveryFee: deliveryFee,
      buttonURL: `${process.env.BACKEND_URL!}/orders/ready_for_delivery?id=${orderId}`,
    });

    await transporter.sendMail({
      subject: "Novo pedido no seu restaurante!",
      from: SENDER_EMAIL,
      to: RESTAURANT_EMAIL,
      bcc: SENDER_EMAIL,
      html,
    });
  },
  sendDeliveryEmail: async (data: { orderId: string; address: string }) => {
    const email = renderEmailFactory(EntregaEmail);

    const html = await email({
      clientAddress: data.address,
      date: new Date(),
      buttonUrl: `${process.env.BACKEND_URL!}/orders/delivered?id=${data.orderId}`,
    });

    await transporter.sendMail({
      subject: "Oba, tem entrega nova!",
      from: SENDER_EMAIL,
      to: MOTOBOY_EMAIL,
      bcc: SENDER_EMAIL,
      html,
    });
  },
};

export default EmailService;
