import express from "express";

import ConfigModel from "../models/ConfigModel";
import catchError from "../errors/catchError";
import configSchema from "../schemas/config";

const route = express.Router();

route.get("/", async (_, res) => {
  const [error, config] = await catchError(
    ConfigModel.findById("systemConfig")
  );

  if (error) {
    console.error(error);
    res.status(500).send("Internal server error");
    return;
  }

  if (!config) {
    res.status(404).send("Config not found");
    return;
  }

  res.json({ isOpen: config.isOpen });
});

route.put("/", async (req, res) => {
  const { data, error } = configSchema.open.safeParse(req.body);

  if (error) {
    res.status(400).send("Invalid request body");
    return;
  }

  const [dbError] = await catchError(
    (async () => {
      const config = await ConfigModel.findByIdAndUpdate(
        "systemConfig",
        { isOpen: data.isOpen },
        { new: true, upsert: true }
      );

      if (!config) {
        res.status(404).send("Config not found");
        return;
      }

      await config.save();
    })()
  );

  if (dbError) {
    console.error(dbError);
    res.status(500).send("Internal server error");
    return;
  }

  res.send("Config updated successfully");
});

export default route;
