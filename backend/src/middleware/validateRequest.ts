import { BadRequestError } from "@/errors/HTTPError";
import { RequestHandler } from "express";
import { Schema } from "yup";

import catchError from "@/errors/catchError";

export default function validateRequest(
  schema: Schema,
  target: "query" | "params" | "body",
): RequestHandler {
  return async (req, res, next) => {
    const [err] = await catchError(schema.validate(req[target]));

    if (err) {
      throw new BadRequestError(`Invalid ${target}`);
    }

    next();
  };
}
