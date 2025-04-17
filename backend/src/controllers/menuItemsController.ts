import { Request, Response } from "express";
import catchError from "../errors/catchError";
import MenuItemRepository from "../repositories/MenuItemRepository";

const MenuItemsController = {
  getMenuItems: async (req: Request, res: Response) => {
    const [error, menuItems] = await catchError(
      MenuItemRepository.getMenuItems()
    );

    if (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ error: "Internal server error" });

      return;
    }

    res.send(menuItems);
  },
};

export default MenuItemsController;
