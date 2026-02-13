import express, { Express, Request, Response } from "express";
import { ResourceNotFoundError } from "../../errors/HTTPError";

import { NeighborhoodService } from "./service.d";
import validateRequest from "@/middleware/validateRequest";
import neighborhoodSchemas from "./schemas";
import { withId } from "@/shared/idSchema";

export class NeighborhoodHandler {
  constructor(
    app: Express,
    private service: NeighborhoodService,
  ) {
    const router = express.Router();

    router.get("/", this.list.bind(this));
    router.post(
      "/",
      validateRequest(neighborhoodSchemas.create, "body"),
      this.create.bind(this),
    );
    router.patch(
      "/:id",
      validateRequest(withId, "params"),
      validateRequest(neighborhoodSchemas.update, "body"),
      this.update.bind(this),
    );
    router.delete(
      "/:id",
      validateRequest(withId, "params"),
      this.delete.bind(this),
    );
    router.get(
      "/:id",
      validateRequest(withId, "params"),
      this.findById.bind(this),
    );

    app.use("/neighborhoods", router);
  }

  async list(_: Request, res: Response) {
    const neighborhoods = await this.service.list();

    if (!neighborhoods.length) {
      throw new ResourceNotFoundError("Neighborhoods");
    }

    res.status(200).json(neighborhoods);
  }

  async create(req: Request, res: Response) {
    const data = req.body;

    const item = await this.service.create(data);

    res.status(201).json({ ...item });
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

    await this.service.delete(id);

    res.status(200).json({ message: "neighborhood deleted successfully!" });
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id;

    const item = await this.service.findById(id);

    res.status(200).json({ ...item });
  }
}
