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
exports.getAnimalsByRegistrationDate = exports.getAnimalCountBySpecies = exports.getAnimalCountByZone = exports.deleteAnimal = exports.updateAnimal = exports.getAnimals = exports.createAnimal = void 0;
const animal_1 = __importDefault(require("../models/animal"));
const specie_1 = __importDefault(require("../models/specie"));
const comment_1 = __importDefault(require("../models/comment"));
const reply_1 = __importDefault(require("../models/reply"));
const createAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specie = yield specie_1.default.findOne({ name: req.body.species });
        if (!specie) {
            return res.status(404).json({ message: "Species not found" });
        }
        const newAnimal = new animal_1.default({
            name: req.body.name,
            species: specie._id,
            zone: req.body.zone,
        });
        const savedAnimal = yield newAnimal.save();
        res.status(201).json(savedAnimal);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
});
exports.createAnimal = createAnimal;
const getAnimals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zones = yield animal_1.default.find();
        res.status(200).json(zones);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
});
exports.getAnimals = getAnimals;
const updateAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, species } = req.body;
        const updatedAnimal = yield animal_1.default.findByIdAndUpdate(id, { name, species }, { new: true });
        if (updatedAnimal) {
            res.status(200).json(updatedAnimal);
        }
        else {
            res.status(404).json({ message: "Animal not found" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
});
exports.updateAnimal = updateAnimal;
const deleteAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedAnimal = yield animal_1.default.findByIdAndDelete(id);
        if (deletedAnimal) {
            yield comment_1.default.deleteMany({ animal: deletedAnimal._id });
            const comments = yield comment_1.default.find({ animal: deletedAnimal._id });
            const commentIds = comments.map((comment) => comment._id);
            yield reply_1.default.deleteMany({ comment: { $in: commentIds } });
            res.json({ message: "Animal and comments deleted", deletedAnimal });
        }
        else {
            res.status(404).json({ message: "Animal not found" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
});
exports.deleteAnimal = deleteAnimal;
const getAnimalCountByZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zoneId = req.params.zoneId;
        const animalCountByZone = yield animal_1.default.countDocuments({ zone: zoneId });
        res.json({ count: animalCountByZone });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
});
exports.getAnimalCountByZone = getAnimalCountByZone;
const getAnimalCountBySpecies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animalCountBySpecies = yield animal_1.default.aggregate([
            {
                $group: {
                    _id: "$species",
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    species: "$_id",
                    count: 1,
                },
            },
        ]);
        res.json(animalCountBySpecies);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
});
exports.getAnimalCountBySpecies = getAnimalCountBySpecies;
const getAnimalsByRegistrationDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dateStr = req.params.date;
        const [year, month, day] = dateStr.split("-").map(Number);
        const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
        const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);
        const animals = yield animal_1.default.find({
            registrationDate: {
                $gte: startOfDay,
                $lt: endOfDay,
            },
        })
            .populate("species", "name")
            .populate("zone", "name");
        res.json(animals);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
});
exports.getAnimalsByRegistrationDate = getAnimalsByRegistrationDate;
