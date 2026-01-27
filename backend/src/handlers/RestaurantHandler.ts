import express, { Express, Request, Response } from "express";
import { RestaurantService } from "../services/RestaurantService.d";

export class RestaurantHandler {
  constructor(
    app: Express,
    private restaurantService: RestaurantService,
  ) {
    const router = express.Router();

    router.get("/", this.getRestaurants.bind(this));

    app.use("/restaurante", router);
  }

  async getRestaurants(req: Request, res: Response) {
    const restaurants = await this.restaurantService.getAll();

    res.status(200).json({ restaurantes: restaurants });
  }
}
