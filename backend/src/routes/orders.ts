import express from "express";
import OrderModel from "../models/OrderModel";
import mongoose from "mongoose";

import OrderController from "../controllers/orderController";

const route = express.Router();

route.post("/", OrderController.createOrder);

route.get("/confirm_payment", OrderController.registerPayment);

route.get("/ready_for_delivery", OrderController.readyForDelivery);

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
