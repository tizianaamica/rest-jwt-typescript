import { Router } from "express";
import { createComment, addReply } from "../controllers/comment.controller";

const router = Router();

router.post("/comment", createComment);
router.post("/:commentId/reply", addReply);

export default router;
