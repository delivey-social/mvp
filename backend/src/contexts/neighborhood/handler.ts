import express, { Express, Request, Response } from "express";
import { ResourceNotFoundError } from "../../errors/HTTPError";

import { NeighborhoodService } from "./service.d";

export class NeighborhoodHandler {
  constructor(
    app: Express,
    private service: NeighborhoodService,
  ) {
    const router = express.Router();

    router.get("/", this.getAll.bind(this));
    router.post("/", this.create.bind(this));

    app.use("/neighborhoods", router);
  }

  async getAll(_: Request, res: Response) {
    const neighborhoods = await this.service.getAll();

    if (!neighborhoods.length) {
      throw new ResourceNotFoundError("Neighborhoods");
    }

    res.status(200).json(neighborhoods);
  }

  async create(req: Request, res: Response) {
    // TODO: Validate input
    const data = req.body;

    const id = await this.service.create(data);

    res.status(201).json({ id });
  }
}
