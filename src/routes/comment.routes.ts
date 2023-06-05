import { Router } from "express";
import {
  createComment,
  addReply,
  getComments,
  getResponsePercentage,
} from "../controllers/comment.controller";

const router = Router();

router.post("/comment", createComment);
router.post("/:commentId/reply", addReply);
router.get("/comments", getComments);
router.get("/comment/percentage", getResponsePercentage);

export default router;
