import { Router } from "express";
import {
  createSpecie,
  getSpecies,
  updateSpecie,
  deleteSpecie,
} from "../controllers/specie.controller";

const router = Router();

router.post("/specie", createSpecie);
router.get("/specie", getSpecies);
router.put("/specie/:id", updateSpecie);
router.delete("/specie/:id", deleteSpecie);

export default router;
