import configureApp from "./config/server";

import dotenv from "dotenv";
import connectToDatabase from "./config/database";
import configureEmails from "./config/emails";

import OrderModel from "./models/OrderModel";
import { OrderMongoRepository } from "./repositories/OrderRepository";
import { OrderService } from "./services/OrderService";
import { OrderHandler } from "./handlers/OrderHandler";

import NeighborhoodModel from "./models/NeighborhoodModel";
import { NeighborhoodService } from "./services/NeighborhoodService";
import { NeighborhoodHandler } from "./handlers/NeighborhoodHandler";

import errorHandler from "./middleware/errorHandler";
import { NeighborhoodRepository } from "./repositories/NeighborhoodRepository";

function main() {
  dotenv.config();

  const app = configureApp();

  connectToDatabase();
  configureEmails();

  const orderRepo = new OrderMongoRepository(OrderModel);
  const orderService = new OrderService(orderRepo);
  new OrderHandler(app, orderService);

  const neighborhoodsRepo = new NeighborhoodRepository(NeighborhoodModel);
  const neighborhoodsService = new NeighborhoodService(neighborhoodsRepo);
  new NeighborhoodHandler(app, neighborhoodsService);

  app.get("/", (_, res) => {
    res.send("Service is online");
  });

  app.use(errorHandler);
}

main();
