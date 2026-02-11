import mongoose, { Document } from "mongoose";

export default function cleanMongooseObject<T>(obj: Document & T): T {
  return {
    ...obj.toObject(),
    id: (obj._id as mongoose.Schema.Types.ObjectId).toString(),
    __v: undefined,
    _id: undefined,
  };
}
