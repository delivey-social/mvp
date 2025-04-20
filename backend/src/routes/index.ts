import app from "../config/server";
import errorHandler from "../middleware/errorHandler";

import ordersRoute from "./orders";
import neighborhoodsRoute from "./neighborhoods";
import openRoute from "./open";
import menuItemsRoute from "./menu-items";

import express from "express";

app.get("/", (_, res) => {
  res.send("Service is online");
});

app.use("/orders", ordersRoute);
app.use("/neighborhoods", neighborhoodsRoute);
app.use("/open", openRoute);
app.use("/menu-items", menuItemsRoute);

app.use("/images", express.static("public/menu_images"));

app.use(errorHandler);
