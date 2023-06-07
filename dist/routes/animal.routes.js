"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const animal_controller_1 = require("../controllers/animal.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddlewares_1 = require("../middlewares/validationMiddlewares");
const validatations_1 = require("../utils/validatations");
const router = (0, express_1.Router)();
router.get("/view/animals", authMiddleware_1.authMiddleware, animal_controller_1.getAnimals);
router.post("/animal", (0, validationMiddlewares_1.validation)(validatations_1.animalValidate), authMiddleware_1.authMiddleware, animal_controller_1.createAnimal);
router.put("/animal/:id", (0, validationMiddlewares_1.validation)(validatations_1.animalValidate), authMiddleware_1.authMiddleware, animal_controller_1.updateAnimal);
router.delete("/animal/:id", authMiddleware_1.authMiddleware, animal_controller_1.deleteAnimal);
router.get("/animals/:zoneId", authMiddleware_1.authMiddleware, animal_controller_1.getAnimalCountByZone);
router.get("/animal/species", authMiddleware_1.authMiddleware, animal_controller_1.getAnimalCountBySpecies);
router.get("/animals/registration/:date", authMiddleware_1.authMiddleware, animal_controller_1.getAnimalsByRegistrationDate);
exports.default = router;
