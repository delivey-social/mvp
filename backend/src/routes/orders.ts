import express from "express";
import { z } from "zod";

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

route.post("/", (req, res) => {
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

  res.send("Order created successfully!");
});

export default route;
