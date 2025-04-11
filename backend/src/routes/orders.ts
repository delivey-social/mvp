import express from "express";
import OrderModel from "../models/OrderModel";
import mongoose, { Types } from "mongoose";
import sendgrid from "@sendgrid/mail";

import { MailDataRequired } from "@sendgrid/mail";

import menuJSON from "../../public/menu_items.json";
import { IMenuItem } from "../../public/MenuItems";

import PedidoEmail from "../../../shared/emails/emails/pedido";
import EntregaEmail from "../../../shared/emails/emails/entrega";

import { render } from "@react-email/render";
import OrderController from "../controllers/orderController";
import { z } from "zod";
import idSchema from "../schemas/id";
import { ResourceNotFoundError } from "../errors/HTTPError";

const route = express.Router();

const SENDER_EMAIL = "admin@comida.app.br";

const RESTAURANT_EMAIL =
  process.env.MODE === "PRODUCTION"
    ? "santocrepecwb@gmail.com"
    : "thiagotolotti@gmail.com";
const MOTOBOY_EMAIL = "thiagotolotti@gmail.com";

route.post("/", OrderController.createOrder);

route.get("/confirm_payment", async (req, res) => {
  const querySchema = z.object({ id: idSchema }).strict();

  const { data, error: queryError } = querySchema.safeParse(req.query);

  if (queryError) {
    res.status(400).json("A valid order id is required");
    return;
  }

  const { id } = data;
  const order = await OrderModel.findById(id).select("status items");

  if (!order) throw new ResourceNotFoundError("Order");

  const { status, items } = order;

  if (status !== "WAITING_PAYMENT") {
    res.status(400).json("Order with payment already confirmed");
    return;
  }

  const generateOrderEmail = generateEmailFactory(PedidoEmail);
  const html = await generateOrderEmail({
    items: items.map((item) => {
      const menu = [...menuJSON.salgados, ...menuJSON.doces];
      const menuItem = menu.find(
        (menuItem) => item.id === menuItem.id
      ) as IMenuItem;

      return { ...menuItem, quantity: item.quantity };
    }),
    buttonURL: `${process.env.BACKEND_URL!}/orders/ready_for_delivery?id=${
      order.id
    }`,
  });

  const message: MailDataRequired = {
    from: SENDER_EMAIL,
    to: RESTAURANT_EMAIL,
    subject: "Novo pedido!",
    html,
    bcc: SENDER_EMAIL,
  };

  await sendgrid.send(message);

  try {
    await order.updateOne({ status: "PREPARING" });

    res.send("Payment confirmed");
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json("Error updating order status");
    return;
  }
});

route.get("/ready_for_delivery", async (req, res) => {
  const { id } = req.query;

  if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json("A valid order id is required");
    return;
  }

  const order = await OrderModel.findById(id).select("status user");

  if (!order || order.status !== "PREPARING") {
    res.status(400).json("Order not found or already prepared");
    return;
  }

  const generateDeliveryEmail = generateEmailFactory(EntregaEmail);
  const html = await generateDeliveryEmail({
    clientAddress: order.user.address,
    date: new Date(),
    buttonUrl: `${process.env.BACKEND_URL!}/orders/delivered?id=${order.id}`,
  });

  const message: MailDataRequired = {
    from: SENDER_EMAIL,
    to: MOTOBOY_EMAIL,
    subject: "Nova Entrega!",
    html,
    bcc: SENDER_EMAIL,
  };

  await sendgrid.send(message);

  try {
    await order.updateOne({ status: "READY_FOR_DELIVERY" });

    res.send("Order is ready for delivery");
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json("Error updating order status");
    return;
  }
});

route.get("/delivered", async (req, res) => {
  const { id } = req.query;

  if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json("A valid order id is required");
    return;
  }

  const order = await OrderModel.findById(id).select("status");

  if (!order || order.status !== "READY_FOR_DELIVERY") {
    res.status(400).json("Order not found or already prepared");
    return;
  }

  try {
    await order.updateOne({ status: "DELIVERED" });

    res.send("Order is delivered");
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json("Error updating order status");
    return;
  }
});

function generateEmailFactory(email: (props: any) => any) {
  return async (props: unknown): Promise<string> => {
    // @ts-ignore-next-line
    return await render(email(props));
  };
}

export default route;
