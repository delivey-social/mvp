import express from "express";
import { z } from "zod";
import OrderModel from "../../models/OrderModel";

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

    res
      .status(201)
      .json({ message: "Order created successfully", id: order["_id"] });
  } catch (error) {
    res.status(500).json("Error creating order");
    return;
  }
});

route.patch("/:id/confirm_payment", async (req, res) => {
  const id = req.params.id;

  const order = await OrderModel.findById(id).select("status");

  const status = order?.status;

  if (!order || status !== "WAITING_PAYMENT") {
    res.status(400).json("Order not found or already confirmed");
    return;
  }

  await order.updateOne({ status: "PREPARING" });

  res.send("Payment confirmed");
});

export default route;
