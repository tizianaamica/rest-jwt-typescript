"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const animal_controller_1 = require("../controllers/animal.controller");
const router = (0, express_1.Router)();
router.get("/animals", animal_controller_1.getAnimals);
router.post("/animal", animal_controller_1.createAnimal);
router.put("/animal/:id", animal_controller_1.updateAnimal);
router.delete("/animal/:id", animal_controller_1.deleteAnimal);
exports.default = router;
