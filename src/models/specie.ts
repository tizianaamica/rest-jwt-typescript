import { model, Schema, Document } from "mongoose";

export interface ISpecie extends Document {
  name: string;
}

const specieSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

export default model<ISpecie>("Specie", specieSchema);
