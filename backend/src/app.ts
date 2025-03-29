import express from "express";
import route from "./routes/orders";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

dotenv.config();

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

app.use("/orders", route);

const port = 3000;
app.listen(port, () => {
  console.clear();
  console.log(`Server listening on port ${port}`);
});
