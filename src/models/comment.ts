import { Schema, model, Document } from "mongoose";

export interface IComment extends Document {
  body: string;
  author: string;
  date: Date;
  replies: IComment[];
  animal: Schema.Types.ObjectId;
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
});

const CommentModel = model<IComment>("Comment", commentSchema);

export default CommentModel;
