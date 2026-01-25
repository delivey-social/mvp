import configureApp from "./config/server";

import dotenv from "dotenv";
import connectToDatabase from "./config/database";
import configureEmails from "./config/emails";

import OrderModel from "./models/OrderModel";
import { OrderMongoRepository } from "./repositories/OrderRepository";
import { OrderService } from "./services/OrderService";
import { OrderHandler } from "../handlers/OrderHandler";

import neighborhoodsRoute from "./routes/neighborhoods";
import openRoute from "./routes/open";
import errorHandler from "./middleware/errorHandler";

function main() {
  dotenv.config();

  const app = configureApp();

  connectToDatabase();
  configureEmails();

  const orderRepo = new OrderMongoRepository(OrderModel);
  const orderService = new OrderService(orderRepo);
  new OrderHandler(app, orderService);

  app.get("/", (_, res) => {
    res.send("Service is online");
  });

  app.use("/neighborhoods", neighborhoodsRoute);
  app.use("/open", openRoute);

  app.use(errorHandler);

  console.log("OrderHandler initialized");
}

main();
