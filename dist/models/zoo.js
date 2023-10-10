"use strict";
// Zoo.ts
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ComentarioSchema = new mongoose_1.Schema({
    cuerpo: String,
    autor: String,
    fecha: Date,
    resuelto: Boolean,
});
const AnimalSchema = new mongoose_1.Schema({
    nombre: String,
    especie: String,
    comentarios: [ComentarioSchema],
});
const ZonaSchema = new mongoose_1.Schema({
    nombre: String,
    animales: [AnimalSchema],
});
// Crea el modelo de Zona
const ZonaModel = (0, mongoose_1.model)("Zona", ZonaSchema);
exports.default = ZonaModel;
