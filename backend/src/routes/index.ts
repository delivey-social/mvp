import app from "../config/server";
import errorHandler from "../middleware/errorHandler";

import neighborhoodsRoute from "./neighborhoods";
import openRoute from "./open";

app.get("/", (_, res) => {
  res.send("Service is online");
});

app.use("/neighborhoods", neighborhoodsRoute);
app.use("/open", openRoute);

app.use(errorHandler);
