import mongoose, { Document } from "mongoose";
import { NeighborhoodDTO } from "shared/types/dtos/neighborhoods";

const neighborhoodSchema = new mongoose.Schema<NeighborhoodDTO & Document>({
  name: { type: String, required: true },
  deliveryFee: { type: Number, required: true },
});

neighborhoodSchema.set("toObject", {
  virtuals: true,
});

const NeighborhoodModel = mongoose.model<NeighborhoodDTO & Document>(
  "neighborhoods",
  neighborhoodSchema,
);

export default NeighborhoodModel;
