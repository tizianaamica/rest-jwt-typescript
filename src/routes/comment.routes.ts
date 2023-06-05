import { Router } from "express";
import {
  createComment,
  addReply,
  getComments,
} from "../controllers/comment.controller";

const router = Router();

router.post("/comment", createComment);
router.post("/:commentId/reply", addReply);
router.get("/comments", getComments);

export default router;
