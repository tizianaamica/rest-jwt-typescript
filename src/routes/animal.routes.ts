import { Router } from "express";
import {
  getAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalCountByZone,
  getAnimalCountBySpecies,
  getAnimalsByRegistrationDate,
} from "../controllers/animal.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/view/animals", authMiddleware, getAnimals);
router.post("/animal", authMiddleware, createAnimal);
router.put("/animal/:id", authMiddleware, updateAnimal);
router.delete("/animal/:id", authMiddleware, deleteAnimal);
router.get("/animals/:zoneId", authMiddleware, getAnimalCountByZone);
router.get("/animal/species", authMiddleware, getAnimalCountBySpecies);
router.get(
  "/animals/registration/:date",
  authMiddleware,
  getAnimalsByRegistrationDate
);

export default router;
