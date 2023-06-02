import { Router } from "express";
import {
  getAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animal.controller";

const router = Router();

router.get("/animals", getAnimals);
router.post("/animal", createAnimal);
router.put("/animal/:id", updateAnimal);
router.delete("/animal/:id", deleteAnimal);

export default router;
