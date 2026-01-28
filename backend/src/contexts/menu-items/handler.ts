import express, { Express, Request, Response } from "express";

import { MenuItemsService } from "./service.d";
import { CreateMenuItemRequest } from "./types.d";

export class MenuItemsHandler {
  constructor(
    app: Express,
    private service: MenuItemsService,
  ) {
    const router = express.Router();

    router.get("/", this.getAll.bind(this));
    router.post("/", this.create.bind(this));

    app.use("/menu-items", router);
  }

  private async getAll(req: Request, res: Response) {
    const items = await this.service.getAll();
    res.status(200).json(items);
  }

  private async create(req: Request, res: Response) {
    const data: CreateMenuItemRequest = req.body;

    const id = await this.service.create(data);

    res.status(201).json({ message: "Item criado com sucesso", id });
  }
}
