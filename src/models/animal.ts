import { model, Schema, Document } from "mongoose";

export interface IAnimal extends Document {
  name: string;
  species: string;
}

const animalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: Schema.Types.ObjectId,
    ref: "Specie",
    required: true,
  },
});

export default model<IAnimal>("Animal", animalSchema);
