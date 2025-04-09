import express from "express";
import NeighborhoodModel from "../models/NeighborhoodModel";

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const neighborhoods = await NeighborhoodModel.find({})
      .collation({ locale: "pt", strength: 1 })
      .sort({
        name: "asc",
      });

    res.status(200).json(neighborhoods);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
    return;
  }
});

export default route;
