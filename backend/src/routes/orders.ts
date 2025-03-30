import express from "express";
import { z } from "zod";
import OrderModel from "../../models/OrderModel";
import mongoose from "mongoose";
import sendgrid from "@sendgrid/mail";

import { MailDataRequired } from "@sendgrid/mail";

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
      html: `Valor total: R$ ${order.totalAmount}.<br/> id: ${order["_id"]}`,
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

// TODO: Send email for restaurant asking for producing
route.patch("/:id/confirm_payment", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json("A valid order id is required");
    return;
  }

  const order = await OrderModel.findById(id).select("status");

  const status = order?.status;

  if (!order || status !== "WAITING_PAYMENT") {
    res.status(400).json("Order not found or already confirmed");
    return;
  }

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

// TODO: Send email for driver asking for delivery
route.patch("/:id/ready_for_delivery", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json("A valid order id is required");
    return;
  }

  const order = await OrderModel.findById(id).select("status");

  if (!order || order.status !== "PREPARING") {
    res.status(400).json("Order not found or already prepared");
    return;
  }

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

route.patch("/:id/delivered", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
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
