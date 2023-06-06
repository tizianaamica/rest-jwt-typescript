import { Router } from "express";
import {
  createComment,
  addReply,
  getComments,
  getRepliesByCommentId,
  getResponsePercentage,
} from "../controllers/comment.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/comment", authMiddleware, createComment);
router.post("/:commentId/reply", authMiddleware, addReply);
router.get("/comments", authMiddleware, getComments);
router.get("/replys/:commentId", authMiddleware, getRepliesByCommentId);
router.get("/comment/percentage", authMiddleware, getResponsePercentage);

export default router;
