import express, { Express, Request, Response } from "express";

import { RestaurantService } from "./service.d";
import { CreateRestaurantRequest, UpdateRestaurantRequest } from "./types.d";

export class RestaurantHandler {
  constructor(
    app: Express,
    private service: RestaurantService,
  ) {
    const router = express.Router();

    router.get("/", this.list.bind(this));
    router.post("/", this.create.bind(this));
    router.patch("/:id", this.update.bind(this));

    app.use("/restaurante", router);
  }

  async list(req: Request, res: Response) {
    const restaurants = await this.service.getAll();

    res.status(200).json({ restaurantes: restaurants });
  }

  async create(req: Request, res: Response) {
    // TODO: Validate data
    const data: CreateRestaurantRequest = req.body;

    const restaurantId = await this.service.create(data);

    res.status(201).json({ id: restaurantId });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const data: UpdateRestaurantRequest = req.body;

    await this.service.update(id, data);

    res.status(200).json({ message: "Restaurant updated successfully" });
  }
}
