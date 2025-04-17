import mongoose, { Document } from "mongoose";

import { Status } from "../types/Status";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  status: Status;
}

const menuItemSchema = new mongoose.Schema<MenuItem & Document>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: Object.values(Status), required: true },
});

const MenuItemModel = mongoose.model<MenuItem & Document>(
  "menu-item",
  menuItemSchema
);

export default MenuItemModel;
