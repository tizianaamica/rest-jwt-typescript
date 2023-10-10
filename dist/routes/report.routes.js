"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("../controllers/report.controller");
const router = (0, express_1.Router)();
// Definir la ruta para generar informes para zonas
router.get("/generateReportsForZones", report_controller_1.generateReportsForZones);
exports.default = router;
