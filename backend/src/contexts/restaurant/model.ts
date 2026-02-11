import mongoose, { Schema, Document } from "mongoose";

import { Restaurant } from "./types";

const restaurantSchema = new Schema<Restaurant & Document>({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

restaurantSchema.set("toObject", {
  virtuals: true,
});

const RestaurantModel = mongoose.model<Restaurant & Document>(
  "Restaurant",
  restaurantSchema,
);

export default RestaurantModel;
