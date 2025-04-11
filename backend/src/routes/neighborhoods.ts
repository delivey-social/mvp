import express from "express";

import NeighborhoodModel from "../models/NeighborhoodModel";
import catchError from "../errors/catchError";

const route = express.Router();

route.get("/", async (_, res) => {
  const [error, neighborhoods] = await catchError(NeighborhoodModel.find({}));

  if (error) {
    console.error(error);
    res.status(500).send("Internal server error");
    return;
  }

  res.status(200).json(neighborhoods);
});

export default route;
