import express from "express";
import { z } from "zod";

import ConfigModel from "../models/ConfigModel";

const route = express.Router();

route.get("/", async (_, res) => {
  try {
    const config = await ConfigModel.findById("systemConfig");

    if (!config) {
      res.status(404).send("Config not found");
      return;
    }

    res.json({ isOpen: config.isOpen });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

const openSchema = z.object({
  isOpen: z.boolean(),
});

route.put("/", async (req, res) => {
  const { data, error } = openSchema.safeParse(req.body);

  if (error) {
    console.error(error);
    res.status(400).send("Invalid request body");
    return;
  }

  try {
    const config = await ConfigModel.findByIdAndUpdate(
      "systemConfig",
      { isOpen: data.isOpen },
      { new: true, upsert: true }
    );

    await config?.save();

    res.send("Config updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

export default route;
