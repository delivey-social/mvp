import mongoose, { Document } from "mongoose";

export default function cleanMongooseObject<T>(obj: Document & T): T {
  return {
    id: obj._id.toString(),
    ...obj.toObject(),
    __v: undefined,
    _id: undefined,
  };
}
