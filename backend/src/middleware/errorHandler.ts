import { NextFunction, Request, Response } from "express";
import HTTPError from "../errors/HTTPError";

export default async function errorHandler(
  err: Error,
  _: Request,
  res: Response,
  //eslint-disable-next-line
  __: NextFunction
) {
  if (err instanceof HTTPError) {
    res.status(err.statusCode).send(err.message);
    return;
  }

  console.error("Unhandled Error: ", err);
  res.status(500).send("Internal Server Error");
}
