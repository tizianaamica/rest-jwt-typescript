import { Router } from "express";
import {
  createZone,
  getZones,
  updateZone,
  deleteZone,
} from "../controllers/zone.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validation } from "../middlewares/validationMiddlewares";
import { bodyValidate } from "../utils/validatations";

const router = Router();

router.post("/zone", validation(bodyValidate), authMiddleware, createZone);
router.get("/zone", authMiddleware, getZones);
router.put("/zone/:id", authMiddleware, updateZone);
router.delete("/zone/:id", authMiddleware, deleteZone);

export default router;
