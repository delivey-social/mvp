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
    router.patch("/:id", this.update.bind(this));
    router.delete("/:id", this.delete.bind(this));

    app.use("/neighborhoods", router);
  }

  async getAll(_: Request, res: Response) {
    const neighborhoods = await this.service.list();

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

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;

    const success = await this.service.update(id, data);
    if (!success) {
      res.status(400).json({ message: "error updating neighborhood" });
      return;
    }

    res.status(200).json({ message: "neighborhood updated successfully!" });
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    const success = await this.service.delete(id);
    if (!success) {
      res
        .status(400)
        .json({ message: "there was an error deleting the neighborhood" });
      return;
    }

    res.status(200).json({ message: "neighborhood deleted successfully!" });
  }
}
