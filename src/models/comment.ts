import { Schema, model, Document, Types } from "mongoose";
import { IReply } from "./reply";
export interface IComment extends Document {
  body: string;
  author: string;
  date: Date;
  replies: IReply[];
  animal: Schema.Types.ObjectId;
  resuelto: boolean; // Campo para indicar si el comentario está resuelto
}

const commentSchema: Schema<IComment> = new Schema<IComment>({
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  animal: {
    type: Schema.Types.ObjectId,
    ref: "Animal",
    required: true,
  },
  resuelto: {
    type: Boolean,
    default: false, // Valor predeterminado: No resuelto
  },
});

export default model<IComment>("Comment", commentSchema);
