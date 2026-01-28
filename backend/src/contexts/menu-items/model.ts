import mongoose, { Document, Schema } from "mongoose";

import { MenuItem } from "./types.d";

const menuItemSchema = new Schema<MenuItem & Document>({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: false },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

menuItemSchema.virtual("id").get(function (this: MenuItem & Document) {
  return this._id;
});

menuItemSchema.set("toObject", {
  virtuals: true,
});

const MenuItemModel = mongoose.model<MenuItem & Document>(
  "MenuItem",
  menuItemSchema,
);

export default MenuItemModel;
