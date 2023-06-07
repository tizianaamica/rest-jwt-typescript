import { Router } from "express";
import {
  createComment,
  addReply,
  getComments,
  getRepliesByCommentId,
  getResponsePercentage,
} from "../controllers/comment.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validation } from "../middlewares/validationMiddlewares";
import { commentValidate, replyValidate } from "../utils/validatations";

const router = Router();

router.post(
  "/comment",
  validation(commentValidate),
  authMiddleware,
  createComment
);
router.post(
  "/:commentId/reply",
  validation(replyValidate),
  authMiddleware,
  addReply
);
router.get("/comments", authMiddleware, getComments);
router.get("/replys/:commentId", authMiddleware, getRepliesByCommentId);
router.get("/comment/percentage", authMiddleware, getResponsePercentage);

export default router;
