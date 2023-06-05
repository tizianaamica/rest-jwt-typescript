import { Router } from "express";
import {
  getAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalCountByZone,
} from "../controllers/animal.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/view/animals", authMiddleware, getAnimals);
router.post("/animal", createAnimal);
router.put("/animal/:id", updateAnimal);
router.delete("/animal/:id", deleteAnimal);
router.get("/animals/:zone", authMiddleware, getAnimalCountByZone);

export default router;
