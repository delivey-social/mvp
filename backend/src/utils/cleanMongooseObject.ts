import mongoose, { Document } from "mongoose";

export default function cleanMongooseObject<T>(obj: Document & T): T {
  return {
    id: (obj._id as mongoose.Schema.Types.ObjectId).toString(),
    ...obj.toObject(),
    __v: undefined,
    _id: undefined,
  };
}
