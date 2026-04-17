import HTTPError from "@/errors/HTTPError";

export default function validateStringParam(param: string | string[]): string {
  if (typeof param !== "string") {
    throw new HTTPError(400, "Invalid parameter: expected a string");
  }

  return param;
}
