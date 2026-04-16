import express, { Express, Request, Response } from "express";

import { MenuItemsService } from "./service.d";
import {
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
} from "@shared/types/menu_items";
import validateRequest from "@/middleware/validateRequest";
import menuItemsSchemas from "./schemas";
import { withId } from "@/shared/idSchema";

export class MenuItemsHandler {
  constructor(
    app: Express,
    private service: MenuItemsService,
  ) {
    const router = express.Router();

    router.get("/", this.list.bind(this));
    router.post(
      "/",
      validateRequest(menuItemsSchemas.create, "body"),
      this.create.bind(this),
    );
    router.patch(
      "/:id",
      validateRequest(withId, "params"),
      validateRequest(menuItemsSchemas.update, "body"),
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

    app.use("/menu-items", router);
  }

  private async list(req: Request, res: Response) {
    const items = await this.service.list();

    res.status(200).json(items);
  }

  private async create(req: Request, res: Response) {
    //TODO: Validate data
    const data: CreateMenuItemRequest = req.body;

    const item = await this.service.create(data);

    res.status(201).json(item);
  }

  private async update(req: Request, res: Response) {
    //TODO: Validate data
    const id = req.params.id;
    const data: UpdateMenuItemRequest = req.body;

    const item = await this.service.update(id, data);

    res.status(200).json(item);
  }

  private async delete(req: Request, res: Response) {
    //TODO: Validate data
    const id = req.params.id;

    await this.service.delete(id);

    res.status(200).json({ message: "Item excluído com sucesso" });
  }

  private async findById(req: Request, res: Response) {
    //TODO: Validate data
    const id = req.params.id;

    const item = await this.service.findById(id);

    res.status(200).json(item);
  }
}
