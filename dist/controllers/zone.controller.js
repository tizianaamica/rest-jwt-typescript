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
exports.deleteZone = exports.updateZone = exports.getZones = exports.createZone = void 0;
const zone_1 = __importDefault(require("../models/zone"));
const animal_1 = __importDefault(require("../models/animal"));
const createZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const existingZone = yield zone_1.default.findOne({ name });
        if (existingZone) {
            return res.status(400).json({ message: "Zone already exists" });
        }
        const zone = new zone_1.default({ name });
        const newZone = yield zone.save();
        res.status(201).json(newZone);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: "Error creating zone", error });
        }
    }
});
exports.createZone = createZone;
const getZones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zones = yield zone_1.default.find();
        res.status(200).json(zones);
    }
    catch (error) {
        res.status(400).json({ message: "Error retrieving zones", error });
    }
});
exports.getZones = getZones;
const updateZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedZone = yield zone_1.default.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedZone) {
            return res.status(404).json({ error: "Zone not found" });
        }
        res.status(200).json(updatedZone);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: "Error updating zone", error });
        }
    }
});
exports.updateZone = updateZone;
const deleteZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const animalsInZone = yield animal_1.default.find({ zone: id });
        if (animalsInZone.length > 0) {
            return res
                .status(400)
                .json({ message: "Zone has associated animals and cannot be deleted" });
        }
        const deletedZone = yield zone_1.default.findByIdAndDelete(id);
        if (deletedZone) {
            res.status(204).json({ message: "Zone deleted", deletedZone });
        }
        else {
            res.status(404).json({ message: "Zone not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Error deleting zone", error });
    }
});
exports.deleteZone = deleteZone;
