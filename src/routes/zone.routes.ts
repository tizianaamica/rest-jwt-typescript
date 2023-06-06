import { Router } from "express";
import {
  createZone,
  getZones,
  updateZone,
  deleteZone,
} from "../controllers/zone.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/zone", authMiddleware, createZone);
router.get("/view/zones", authMiddleware, getZones);
router.put("/zone/:id", authMiddleware, updateZone);
router.delete("/zone/:id", authMiddleware, deleteZone);

export default router;
