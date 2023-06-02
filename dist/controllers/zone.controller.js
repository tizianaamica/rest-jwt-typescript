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
const createZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const zone = new zone_1.default({ name });
        const newZone = yield zone.save();
        res.status(201).json(newZone);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating zone" });
    }
});
exports.createZone = createZone;
const getZones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zones = yield zone_1.default.find();
        res.status(200).json(zones);
    }
    catch (error) {
        res.status(500).json({ error: "Error retrieving zones" });
    }
});
exports.getZones = getZones;
const updateZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedZone = yield zone_1.default.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json(updatedZone);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating zone" });
    }
});
exports.updateZone = updateZone;
const deleteZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield zone_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Zone deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting zone" });
    }
});
exports.deleteZone = deleteZone;
