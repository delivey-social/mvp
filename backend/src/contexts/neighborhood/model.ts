import mongoose, { Document } from "mongoose";
import { Neighborhood } from "./types.d";

const neighborhoodSchema = new mongoose.Schema<Neighborhood & Document>({
  name: { type: String, required: true },
  deliveryFee: { type: Number, required: true },
});

const NeighborhoodModel = mongoose.model<Neighborhood & Document>(
  "neighborhoods",
  neighborhoodSchema,
);

export default NeighborhoodModel;
