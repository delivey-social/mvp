import mongoose, { Schema, Document } from "mongoose";

import { Restaurant } from "./types";

const restaurantSchema = new Schema<Restaurant & Document>({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

restaurantSchema.virtual("id").get(function (this: {
  _id: mongoose.Types.ObjectId;
}) {
  return this._id.toHexString();
});

const RestaurantModel = mongoose.model<Restaurant & Document>(
  "Restaurant",
  restaurantSchema,
);

export default RestaurantModel;
