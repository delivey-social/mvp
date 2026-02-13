import { object, string } from "yup";
import { Types } from "mongoose";

const idSchema = string().test("is-id", `must be a valid ObjectId`, (v) =>
  Boolean(v && Types.ObjectId.isValid(v)),
);

export const withId = object({ id: idSchema.required() }).strict();

export default idSchema;
