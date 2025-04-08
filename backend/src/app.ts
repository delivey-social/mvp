import express from "express";
import route from "./routes/orders";
import neighborhoodsRoute from "./routes/neighborhoods";
import dotenv from "dotenv";
import mongoose from "mongoose";
import sendgrid from "@sendgrid/mail";
import cors, { CorsOptions } from "cors";
import ConfigModel from "../models/ConfigModel";
import { z } from "zod";

dotenv.config();

const app = express();

const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL!,
};
app.use(cors(corsOptions));
app.use(express.json());

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

mongoose.connect(process.env.DATABASE_URL!);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to database");
});
db.on("error", (error) => {
  console.error("Error connecting to database", error);
});

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

const port = 3000;
app.listen(port, () => {
  console.clear();
  console.log(`Server listening on port ${port}`);
});
