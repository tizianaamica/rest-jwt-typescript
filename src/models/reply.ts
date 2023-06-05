import { Schema, model, Document, Types } from "mongoose";

export interface IReply extends Document {
  body: string;
  author: string;
  date: Date;
  comment: string | Types.ObjectId;
}

const replySchema = new Schema<IReply>({
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
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
    validate: {
      validator: (value: string | Types.ObjectId) =>
        typeof value === "string" || value instanceof Types.ObjectId,
      message: "Invalid comment",
    },
  },
});

export default model<IReply>("Reply", replySchema);
