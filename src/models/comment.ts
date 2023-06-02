import { model, Schema, Document } from "mongoose";

interface IComment extends Document {
  body: string;
  author: string;
  date: Date;
  replies: IComment[];
}

const commentSchema = new Schema<IComment>({
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
  replies: {
    type: [Schema.Types.DocumentArray],
    default: [],
  },
});

export default model<IComment>("Comment", commentSchema);
