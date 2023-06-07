import { Router } from "express";
import {
  createSpecie,
  getSpecies,
  updateSpecie,
  deleteSpecie,
} from "../controllers/specie.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validation } from "../middlewares/validationMiddlewares";
import { bodyValidate } from "../utils/validatations";

const router = Router();

router.post("/specie", validation(bodyValidate), authMiddleware, createSpecie);
router.get("/specie", authMiddleware, getSpecies);
router.put(
  "/specie/:id",
  validation(bodyValidate),
  authMiddleware,
  updateSpecie
);
router.delete("/specie/:id", authMiddleware, deleteSpecie);

export default router;
