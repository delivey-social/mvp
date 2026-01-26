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

import { EventBus } from "./infra/EventBus";
import { NotificationsService } from "./services/NotificationsService";
import loggerChannel from "./services/loggerChannel";
import { MenuItemsRepository } from "./repositories/MenuItemsRespository";
import { MenuItemsService } from "./services/MenuItemsService";
import { MenuItemsHandler } from "./handlers/MenuItemsHandler";
import { EmailChannel } from "./services/EmailChannel";

import { RestaurantService } from "./services/RestaurantService";
import { RestaurantRepository } from "./repositories/RestaurantRepository";

function main() {
  dotenv.config();

  const app = configureApp();

  connectToDatabase();
  configureEmails();

  const eventBus = new EventBus();

  const menuItemsRepo = new MenuItemsRepository();
  const menuItemsService = new MenuItemsService(menuItemsRepo);
  new MenuItemsHandler(app, menuItemsService);

  const emailChannel = new EmailChannel(menuItemsService);

  new NotificationsService([loggerChannel, emailChannel], eventBus);

  const neighborhoodsRepo = new NeighborhoodRepository(NeighborhoodModel);
  const neighborhoodsService = new NeighborhoodService(neighborhoodsRepo);
  new NeighborhoodHandler(app, neighborhoodsService);

  const orderRepo = new OrderMongoRepository(OrderModel);
  const orderService = new OrderService(
    orderRepo,
    eventBus,
    neighborhoodsService,
    menuItemsService,
  );
  new OrderHandler(app, orderService);

  const restaurantRepo = new RestaurantRepository();
  new RestaurantService(restaurantRepo);

  app.get("/", (_, res) => {
    res.send("Service is online");
  });

  app.use(errorHandler);
}

main();
