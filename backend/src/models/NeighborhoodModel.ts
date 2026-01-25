import mongoose, { Document } from "mongoose";
import { Neighborhood } from "../types/Neighborhood";

const neighborhoodSchema = new mongoose.Schema<Neighborhood & Document>({
  name: { type: String, required: true },
  baseTariff: { type: Number, required: true },
});

const NeighborhoodModel = mongoose.model<Neighborhood & Document>(
  "neighborhoods",
  neighborhoodSchema,
);

export default NeighborhoodModel;
