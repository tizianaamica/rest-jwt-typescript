import { Router } from "express";
const router = Router();

import { signUp, signIn } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

router.post("/signup", authMiddleware, signUp);
router.post("/signin", signIn);

export default router;
