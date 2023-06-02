import { Request, Response } from "express";
import CommentModel, { IComment } from "../models/comment";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { body, author } = req.body;

    const newComment = new CommentModel({
      body,
      author,
      date: new Date(),
      replies: [],
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment.toObject());
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
};

export const addReply = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { body, author } = req.body;

    const parentComment = await CommentModel.findById(commentId);

    if (!parentComment) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    const newReply = new CommentModel({
      body,
      author,
      date: new Date(),
      replies: [],
    });

    parentComment.replies.push(newReply);

    const savedParentComment = await parentComment.save();

    res.json(savedParentComment.toObject());
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error });
  }
};
