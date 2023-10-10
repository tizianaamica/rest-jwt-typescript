import { Router } from "express";
import { generateReportsForZones } from "../controllers/report.controller";

const router = Router();

// Definir la ruta para generar informes para zonas
router.get("/generateReportsForZones", generateReportsForZones);

export default router;
