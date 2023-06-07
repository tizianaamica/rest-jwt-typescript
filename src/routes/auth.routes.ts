import { Router } from "express";
const router = Router();

import { signUp, signIn } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validation } from "../middlewares/validationMiddlewares";
import { emailValidate } from "../utils/validatations";

router.post("/signup", validation(emailValidate), authMiddleware, signUp);
router.post("/signin", validation(emailValidate), signIn);

export default router;
