import { Response } from "express";

import HTTPError from "./HTTPError";

export default function handleHTTPError(res: Response, error: Error) {
  if (error instanceof HTTPError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  const message =
    error instanceof Error ? error.message : "Internal server error";
  res.status(500).json({ error: message });
}
