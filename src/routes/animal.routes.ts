import { Router } from "express";
import {
  getAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animal.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/view/animals", authMiddleware, getAnimals);
router.post("/animal", createAnimal);
router.put("/animal/:id", updateAnimal);
router.delete("/animal/:id", deleteAnimal);

export default router;
