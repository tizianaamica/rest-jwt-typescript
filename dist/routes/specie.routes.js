"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specie_controller_1 = require("../controllers/specie.controller");
const router = (0, express_1.Router)();
router.post("/specie", specie_controller_1.createSpecie);
router.get("/specie", specie_controller_1.getSpecies);
router.put("/specie/:id", specie_controller_1.updateSpecie);
router.delete("/specie/:id", specie_controller_1.deleteSpecie);
exports.default = router;