import { Schema, model, Document } from "mongoose";

export interface IComment extends Document {
  body: string;
  author: string;
  date: Date;
  replies: IComment[];
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
});

const CommentModel = model<IComment>("Comment", commentSchema);

export default CommentModel;
