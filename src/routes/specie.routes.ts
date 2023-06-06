import { Router } from "express";
import {
  createSpecie,
  getSpecies,
  updateSpecie,
  deleteSpecie,
} from "../controllers/specie.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/specie", authMiddleware, createSpecie);
router.get("/view/species", authMiddleware, getSpecies);
router.put("/specie/:id", authMiddleware, updateSpecie);
router.delete("/specie/:id", authMiddleware, deleteSpecie);

export default router;
