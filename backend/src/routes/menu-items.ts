import express from "express";
import MenuItemsController from "../controllers/menuItemsController";

const route = express.Router();

route.get("/", MenuItemsController.getMenuItems);

export default route;
