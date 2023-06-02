import { model, Schema, Document } from "mongoose";

export interface IZone extends Document {
  name: string;
}

const zoneSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

export default model<IZone>("Zone", zoneSchema);
