import { Router } from "express";
import {
  createComment,
  addReply,
  getComments,
  getResponsePercentage,
} from "../controllers/comment.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/comment", authMiddleware, createComment);
router.post("/:commentId/reply", authMiddleware, addReply);
router.get("/comments", authMiddleware, getComments);
router.get("/comment/percentage", authMiddleware, getResponsePercentage);

export default router;
