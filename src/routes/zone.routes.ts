import { Router } from "express";
import {
  createZone,
  getZones,
  updateZone,
  deleteZone,
} from "../controllers/zone.controller";

const router = Router();

router.post("/zone", createZone);
router.get("/zone", getZones);
router.put("/zone/:id", updateZone);
router.delete("/zone/:id", deleteZone);

export default router;
