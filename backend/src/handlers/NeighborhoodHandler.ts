import express, { Express, Request, Response } from "express";
import { NeighborhoodService } from "../services/NeighborhoodService.d";
import { ResourceNotFoundError } from "../errors/HTTPError";

export class NeighborhoodHandler {
  constructor(
    app: Express,
    private service: NeighborhoodService,
  ) {
    const router = express.Router();

    router.get("/", this.getAll.bind(this));

    app.use("/neighborhoods", router);
  }

  async getAll(_: Request, res: Response) {
    const neighborhoods = await this.service.getAll();

    if (!neighborhoods.length) {
      throw new ResourceNotFoundError("Neighborhoods");
    }

    res.status(200).json(neighborhoods);
  }
}
