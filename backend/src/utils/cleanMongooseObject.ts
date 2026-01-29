import { Document } from "mongoose";

export default function cleanMongooseObject<T>(obj: Document & T): T {
  return {
    ...obj.toObject(),
    id: obj._id,
    __v: undefined,
    _id: undefined,
  };
}
