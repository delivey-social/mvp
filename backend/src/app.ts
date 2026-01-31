import configureApp from "./config/server";

import dotenv from "dotenv";
import connectToDatabase from "./config/database";
import configureEmails from "./config/emails";

import OrderModel from "./contexts/order/model";
import { OrderMongoRepository } from "./contexts/order/repository";
import { OrderService } from "./contexts/order/service";
import { OrderHandler } from "./contexts/order/handler";

import NeighborhoodModel from "./contexts/neighborhood/model";
import { NeighborhoodRepository } from "./contexts/neighborhood/repository";
import { NeighborhoodService } from "./contexts/neighborhood/service";
import { NeighborhoodHandler } from "./contexts/neighborhood/handler";

import errorHandler from "./middleware/errorHandler";

import { EventBus } from "./contexts/notifications/EventBus";
import { NotificationsService } from "./contexts/notifications/service";
import { EmailChannel } from "./contexts/notifications/EmailChannel";
import loggerChannel from "./contexts/notifications/loggerChannel";

import MenuItemModel from "./contexts/menu-items/model";
import { MenuItemsRepository } from "./contexts/menu-items/repository";
import { MenuItemsService } from "./contexts/menu-items/service";
import { MenuItemsHandler } from "./contexts/menu-items/handler";

import RestaurantModel from "./contexts/restaurant/model";
import { RestaurantRepository } from "./contexts/restaurant/repository";
import { RestaurantService } from "./contexts/restaurant/service";
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

  const restaurantRepo = new RestaurantRepository(RestaurantModel);
  const restaurantService = new RestaurantService(restaurantRepo);
  new RestaurantHandler(app, restaurantService);

  app.get("/", (_, res) => {
    res.send("Service is online");
  });

  app.use(errorHandler);
}

main();
