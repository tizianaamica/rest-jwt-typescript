import { Router } from "express";
import {
  createZone,
  getZones,
  updateZone,
  deleteZone,
} from "../controllers/zone.controller";

const router = Router();

router.post("/create/zone", createZone);
router.get("/view/zones", getZones);
router.put("/zone/:id", updateZone);
router.delete("/zone/:id", deleteZone);

export default router;
