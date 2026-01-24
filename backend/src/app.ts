import "./config/environment";
import "./config/database";
import "./config/emails";

import "./routes";

import express from "express";
import OrderModel from "./models/OrderModel";
import { OrderMongoRepository } from "./repositories/OrderRepository";
import { OrderService } from "./services/OrderService";
import { OrderHandler } from "../handlers/OrderHandler";
import app from "./config/server";

function main() {
  const route = express.Router();

  const orderRepo = new OrderMongoRepository(OrderModel);
  const orderService = new OrderService(orderRepo);
  new OrderHandler(route, orderService);

  app.use("/orders", route);
  console.log("OrderHandler initialized");
}

main();
