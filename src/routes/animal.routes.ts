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
router.post("/animal", createAnimal);
router.put("/animal/:id", updateAnimal);
router.delete("/animal/:id", deleteAnimal);
router.get("/animals/:zone", authMiddleware, getAnimalCountByZone);
router.get("/animal/species", authMiddleware, getAnimalCountBySpecies);
router.get(
  "/animals/registration/:date",
  authMiddleware,
  getAnimalsByRegistrationDate
);

export default router;
