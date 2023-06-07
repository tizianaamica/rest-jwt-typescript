import { Request, Response } from "express";
import Comment, { IComment } from "../models/comment";
import Animal from "../models/animal";
import Reply from "../models/reply";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { body, author, animalId } = req.body;
    const animal = await Animal.findById(animalId);
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    const newComment = new Comment({
      body,
      author,
      animal: animal._id,
      date: new Date(),
      replies: [],
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment.toObject());
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: "Error creating comment", error });
    }
  }
};

export const addReply = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { body, author } = req.body;
    const parentComment = await Comment.findById(commentId);

    if (!parentComment) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    const newReply = new Reply({
      body,
      author,
      date: new Date(),
      comment: parentComment._id,
    });

    const savedReply = await newReply.save();
    parentComment.replies.push(savedReply._id);
    const savedParentComment = await parentComment.save();
    res.status(200).json(savedParentComment.toObject());
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: "Error adding reply", error });
    }
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments: IComment[] = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(400)
        .json({ message: "Error retrieving replies", error });
    }
  }
};

export const getRepliesByCommentId = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const replies = await Reply.find({ comment: commentId });
    res.status(200).json(replies);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(400)
        .json({ message: "Error retrieving replies", error });
    }
  }
};

export const getResponsePercentage = async (req: Request, res: Response) => {
  try {
    const totalComments = await Comment.countDocuments();
    const commentsWithReplies = await Comment.countDocuments({
      replies: { $exists: true, $not: { $size: 0 } },
    });

    const responsePercentage = (commentsWithReplies / totalComments) * 100;
    res.json({ responsePercentage });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(400)
        .json({ message: "Error retrieving replies", error });
    }
  }
};
