import express, { Express, Request, Response } from "express";
import { RestaurantService } from "../services/RestaurantService.d";
import { CreateRestaurantRequest } from "../types/Restaurant";

export class RestaurantHandler {
  constructor(
    app: Express,
    private restaurantService: RestaurantService,
  ) {
    const router = express.Router();

    router.get("/", this.getRestaurants.bind(this));
    router.post("/", this.createRestaurant.bind(this));

    app.use("/restaurante", router);
  }

  async getRestaurants(req: Request, res: Response) {
    const restaurants = await this.restaurantService.getAll();

    res.status(200).json({ restaurantes: restaurants });
  }

  async createRestaurant(req: Request, res: Response) {
    // TODO: Validate data
    const data: CreateRestaurantRequest = req.body;

    const restaurantId = await this.restaurantService.create(data);

    res.status(201).json({ id: restaurantId });
  }
}
