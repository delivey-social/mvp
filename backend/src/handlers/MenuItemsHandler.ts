import express, { Express } from "express";
import { MenuItemsService } from "../services/MenuItemsService";

export class MenuItemsHandler {
  constructor(
    app: Express,
    private service: MenuItemsService,
  ) {
    const router = express.Router();

    router.get("/", this.getAllMenuItems.bind(this));

    app.use("/menu-items", router);
  }

  private async getAllMenuItems(req: express.Request, res: express.Response) {
    const items = await this.service.getAll();
    res.status(200).json(items);
  }
}
