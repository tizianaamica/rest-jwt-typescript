"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnimal = exports.updateAnimal = exports.getAnimals = exports.createAnimal = void 0;
const animal_1 = __importDefault(require("../models/animal"));
const specie_1 = __importDefault(require("../models/specie"));
const createAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specie = yield specie_1.default.findOne({ name: req.body.species });
        if (!specie) {
            return res.status(404).json({ message: "Species not found" });
        }
        const newAnimal = new animal_1.default({
            name: req.body.name,
            species: specie._id,
        });
        const savedAnimal = yield newAnimal.save();
        res.json(savedAnimal);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating animal", error });
    }
});
exports.createAnimal = createAnimal;
const getAnimals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zones = yield animal_1.default.find();
        res.status(200).json(zones);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving animal", error });
    }
});
exports.getAnimals = getAnimals;
const updateAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, species } = req.body;
        const updatedAnimal = yield animal_1.default.findByIdAndUpdate(id, { name, species }, { new: true });
        if (updatedAnimal) {
            res.json(updatedAnimal);
        }
        else {
            res.status(404).json({ message: "Animal not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating animal", error });
    }
});
exports.updateAnimal = updateAnimal;
const deleteAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedAnimal = yield animal_1.default.findByIdAndDelete(id);
        if (deletedAnimal) {
            res.json({ message: "Animal deleted", deletedAnimal });
        }
        else {
            res.status(404).json({ message: "Animal not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting animal", error });
    }
});
exports.deleteAnimal = deleteAnimal;
