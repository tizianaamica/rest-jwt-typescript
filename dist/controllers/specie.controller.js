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
exports.deleteSpecie = exports.updateSpecie = exports.getSpecies = exports.createSpecie = void 0;
const specie_1 = __importDefault(require("../models/specie"));
const animal_1 = __importDefault(require("../models/animal"));
const createSpecie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const existingSpecie = yield specie_1.default.findOne({ name });
        if (existingSpecie) {
            return res.status(400).json({ message: "Specie already exists" });
        }
        const specie = new specie_1.default({ name });
        const newSpecie = yield specie.save();
        res.status(201).json(newSpecie);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
});
exports.createSpecie = createSpecie;
const getSpecies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zones = yield specie_1.default.find();
        res.status(200).json(zones);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
});
exports.getSpecies = getSpecies;
const updateSpecie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedSpecie = yield specie_1.default.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedSpecie) {
            return res.status(404).json({ error: "Specie not found" });
        }
        res.status(200).json(updatedSpecie);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
});
exports.updateSpecie = updateSpecie;
const deleteSpecie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const animalsExist = yield animal_1.default.find({ species: id });
        if (animalsExist.length > 0) {
            return res.status(400).json({
                message: "Specie has associated animals and cannot be deleted",
            });
        }
        yield specie_1.default.findByIdAndDelete(id);
        res.status(204).json({ message: "Specie deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
});
exports.deleteSpecie = deleteSpecie;
