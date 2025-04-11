import express from "express";

import OrderController from "../controllers/orderController";

const route = express.Router();

route.post("/", OrderController.createOrder);

route.get("/confirm_payment", OrderController.registerPayment);

route.get("/ready_for_delivery", OrderController.readyForDelivery);

route.get("/delivered", OrderController.delivered);

export default route;
