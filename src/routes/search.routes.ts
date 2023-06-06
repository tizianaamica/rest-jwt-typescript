import express from "express";
import { search } from "../controllers/search.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/search", authMiddleware, search);

export default router;
