import { z } from "zod";
import { Types } from "mongoose";

const idSchema = z.string().refine(Types.ObjectId.isValid);

export default idSchema;
