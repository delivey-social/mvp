import express from "express";
import OrderModel from "../models/OrderModel";
import mongoose from "mongoose";
import sendgrid from "@sendgrid/mail";

import { MailDataRequired } from "@sendgrid/mail";

import EntregaEmail from "../../../shared/emails/emails/entrega";

import { render } from "@react-email/render";
import OrderController from "../controllers/orderController";

const route = express.Router();

const SENDER_EMAIL = "admin@comida.app.br";

const RESTAURANT_EMAIL =
  process.env.MODE === "PRODUCTION"
    ? "santocrepecwb@gmail.com"
    : "thiagotolotti@gmail.com";
const MOTOBOY_EMAIL = "thiagotolotti@gmail.com";

route.post("/", OrderController.createOrder);

route.get("/confirm_payment", OrderController.registerPayment);

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
