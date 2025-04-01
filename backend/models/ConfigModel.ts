import mongoose, { Schema } from "mongoose";

export interface Config extends Document {
  _id: "systemConfig";
  isOpen: boolean;
}

const configSchema = new Schema<Config>({
  _id: { type: String, required: true, default: "systemConfig" },
  isOpen: { type: Boolean, required: true },
});

const ConfigModel = mongoose.model<Config>("Config", configSchema, "config");

export default ConfigModel;
