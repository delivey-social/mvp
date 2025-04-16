import express from "express";

import NeighborhoodModel from "../models/NeighborhoodModel";
import { ResourceNotFoundError } from "../errors/HTTPError";

const route = express.Router();

route.get("/", async (_, res) => {
  const neighborhoods = await NeighborhoodModel.find({}).sort({ name: 1 });

  if (!neighborhoods) {
    throw new ResourceNotFoundError("Neighborhoods");
  }

  res.status(200).json(neighborhoods);
});

export default route;
