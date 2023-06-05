"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const animalSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    species: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Specie",
        required: true,
    },
    zone: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Zone",
        required: true,
    },
});
exports.default = (0, mongoose_1.model)("Animal", animalSchema);
