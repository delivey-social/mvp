import { NextFunction, Request, Response } from "express";
import HTTPError from "../errors/HTTPError";

export default async function errorHandler(
  err: Error,
  _: Request,
  res: Response,
  //eslint-disable-next-line
  __: NextFunction, // If this line is not present it returns HTML instead of JSON
) {
  if (err instanceof HTTPError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error("Unhandled Error: ", err);
  res.status(500).json({ message: "Internal Server Error" });
}
