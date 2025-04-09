import "./config/environment";
import "./config/database";
import "./config/emails";

import app from "./config/server";

import route from "./routes/orders";
import neighborhoodsRoute from "./routes/neighborhoods";
import ConfigModel from "./models/ConfigModel";
import { z } from "zod";

app.get("/", (req, res) => {
  res.send("Service is online");
});

app.get("/open", async (req, res) => {
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

app.put("/open", async (req, res) => {
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

app.use("/orders", route);
app.use("/neighborhoods", neighborhoodsRoute);
