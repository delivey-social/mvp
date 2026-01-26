import mongoose from "mongoose";

export default function connectToDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }

  mongoose.connect(DATABASE_URL);
  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to database");
  });
  db.on("error", (error) => {
    console.error("Error connecting to database", error);
  });

  return db;
}
