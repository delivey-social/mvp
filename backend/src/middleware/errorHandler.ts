import { Request, Response } from "express";

export default function errorHandler(err: Error, _: Request, res: Response) {
  console.error("Unhandled Error: ", err);

  res.status(500).send("Internal Server Error");
}
