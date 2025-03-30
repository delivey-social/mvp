import express from "express";
import { z } from "zod";
import OrderModel from "../../models/OrderModel";
import mongoose from "mongoose";
import sendgrid from "@sendgrid/mail";

import { MailDataRequired } from "@sendgrid/mail";
import {
  IMenuItem,
  menu_doces,
  menu_salgados,
} from "../../public/menu/menu_items";
import PedidoEmail from "../../../shared/emails/emails/pedido";
import { render } from "@react-email/render";

const route = express.Router();

const createOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      quantity: z.number().positive().int(),
    })
  ),
  user: z.object({
    email: z.string().email(),
    phone_number: z.string(),
    address: z.string(),
  }),
  observation: z.string().optional(),
});

route.post("/", async (req, res) => {
  const body = req.body;
  const { success, data } = createOrderSchema.safeParse(body);

  if (!success) {
    res.status(400).json("Invalid request body");
    return;
  }

  if (data.items.length === 0) {
    res.status(400).json("Order should have at least one item");
    return;
  }

  try {
    const order = await OrderModel.create(data);

    await order.save();

    const message: MailDataRequired = {
      from: "thiagotolotti@thiagotolotti.com",
      to: "thiagotolotti@gmail.com",
      subject: "Novo pedido!",
      html: `Valor total: R$ ${order.totalAmount}.<br/> id: ${order["_id"]}.<br/><a href="http://localhost:3000/orders/confirm_payment?id=${order._id}">Confirmar pagamento</a>`,
    };

    await sendgrid.send(message);

    res
      .status(201)
      .json({ message: "Order created successfully", id: order["_id"] });
  } catch (error) {
    console.error(error);
    res.status(500).json("Error creating order");
    return;
  }
});

route.get("/confirm_payment", async (req, res) => {
  const { id } = req.query;

  if (!id || typeof id != "string" || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json("A valid order id is required");
    return;
  }

  const order = await OrderModel.findById(id).select("status items");

  if (!order) {
    res.status(400).json("Order not found");
    return;
  }

  const status = order?.status;
  if (status !== "WAITING_PAYMENT") {
    res.status(400).json("Order with payment already confirmed");
    return;
  }

  const items = order.items;

  async function generateOrderEmail(
    items: (IMenuItem & { quantity: number })[],
    buttonURL: string
  ): Promise<string> {
    return await render(PedidoEmail({ items, buttonURL }));
  }

  const html = await generateOrderEmail(
    order.items.map((item) => {
      const menu = [...menu_salgados, ...menu_doces];
      const menuItem = menu.find(
        (menuItem) => item.id === menuItem.id
      ) as IMenuItem;

      return { ...menuItem, quantity: item.quantity };
    }),
    `http://localhost:3000/orders/ready_for_delivery?id=${order.id}`
  );

  const message: MailDataRequired = {
    from: "thiagotolotti@thiagotolotti.com",
    to: "thiagotolotti@gmail.com",
    subject: "Novo pedido!",
    html,
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

  const order = await OrderModel.findById(id).select("status");

  if (!order || order.status !== "PREPARING") {
    res.status(400).json("Order not found or already prepared");
    return;
  }

  const message: MailDataRequired = {
    from: "thiagotolotti@thiagotolotti.com",
    to: "thiagotolotti@gmail.com",
    subject: "Nova Entrega!",
    html: `Há uma nova entrega disponível! Dirija-se ao restaurante para retirada! <br/> <a href="http://localhost:3000/orders/delivered?id=${order.id}">Entrega finalizada!</a>`,
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

export default route;
