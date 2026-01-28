import configureApp from "./config/server";

import dotenv from "dotenv";
import connectToDatabase from "./config/database";
import configureEmails from "./config/emails";

import OrderModel from "./contexts/order/model";
import { OrderMongoRepository } from "./contexts/order/repository";
import { OrderService } from "./contexts/order/service";
import { OrderHandler } from "./contexts/order/handler";

import NeighborhoodModel from "./models/NeighborhoodModel";
import { NeighborhoodService } from "./services/NeighborhoodService";
import { NeighborhoodHandler } from "./handlers/NeighborhoodHandler";

import errorHandler from "./middleware/errorHandler";
import { NeighborhoodRepository } from "./repositories/NeighborhoodRepository";

import { EventBus } from "./contexts/notifications/EventBus";
import { EmailChannel } from "./contexts/notifications/EmailChannel";
import loggerChannel from "./contexts/notifications/loggerChannel";
import { NotificationsService } from "./contexts/notifications/service";

import { MenuItemsRepository } from "./repositories/MenuItemsRespository";
import { MenuItemsService } from "./services/MenuItemsService";
import { MenuItemsHandler } from "./handlers/MenuItemsHandler";
import MenuItemModel from "./models/MenuItemModel";

import { RestaurantService } from "./contexts/restaurant/service";
import { RestaurantRepository } from "./contexts/restaurant/repository";
import { RestaurantHandler } from "./contexts/restaurant/handler";

function main() {
  dotenv.config();

  const app = configureApp();

  connectToDatabase();
  configureEmails();

  const eventBus = new EventBus();

  const menuItemsRepo = new MenuItemsRepository(MenuItemModel);
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
  const restaurantService = new RestaurantService(restaurantRepo);
  new RestaurantHandler(app, restaurantService);

  app.get("/", (_, res) => {
    res.send("Service is online");
  });

  app.use(errorHandler);
}

main();
