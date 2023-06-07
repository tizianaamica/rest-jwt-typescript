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
import { validation } from "../middlewares/validationMiddlewares";
import { animalValidate } from "../utils/validatations";

const router = Router();

router.get("/animals", authMiddleware, getAnimals);
router.post(
  "/animal",
  validation(animalValidate),
  authMiddleware,
  createAnimal
);
router.put(
  "/animal/:id",
  validation(animalValidate),
  authMiddleware,
  updateAnimal
);
router.delete("/animal/:id", authMiddleware, deleteAnimal);
router.get("/animals/:zoneId", authMiddleware, getAnimalCountByZone);
router.get("/animal/species", authMiddleware, getAnimalCountBySpecies);
router.get(
  "/animals/registration/:date",
  authMiddleware,
  getAnimalsByRegistrationDate
);

export default router;
