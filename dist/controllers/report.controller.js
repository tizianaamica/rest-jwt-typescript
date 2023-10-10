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
exports.generateReportsForZones = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const animal_1 = __importDefault(require("../models/animal"));
const zone_1 = __importDefault(require("../models/zone"));
const comment_1 = __importDefault(require("../models/comment"));
const generateReportsForZones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todas las zonas
        const zones = yield zone_1.default.find();
        for (const zone of zones) {
            const doc = new pdfkit_1.default();
            // Define la ruta para guardar el PDF en la carpeta "src/reports"
            const pdfPath = `src/reports/informe_${zone.name}.pdf`;
            const stream = fs_1.default.createWriteStream(pdfPath);
            doc.pipe(stream);
            doc.fontSize(16).text(`Informe para la Zona: ${zone.name}`);
            doc.moveDown();
            const animals = yield animal_1.default.find({ zone: zone._id });
            for (const animal of animals) {
                doc.fontSize(12).text(`Animal: ${animal.name}`);
                doc.fontSize(10).text(`Especie: ${animal.species}`);
                const comments = yield comment_1.default.find({
                    animal: animal._id,
                });
                if (comments.length > 0) {
                    doc.fontSize(10).text("Comentarios:");
                    doc.moveDown();
                    for (const comment of comments) {
                        doc.fontSize(10).text(`- ${comment.body}`);
                        doc.fontSize(8).text(`Autor: ${comment.author}`);
                        doc.fontSize(8).text(`Fecha: ${comment.date}`);
                        doc.moveDown();
                    }
                }
                doc.moveDown();
            }
            doc.end();
            console.log(`Informe para ${zone.name} generado y guardado en ${pdfPath}`);
        }
        // Enviar una respuesta a la solicitud
        res.status(200).json({ message: "Informes generados con éxito" });
    }
    catch (error) {
        // Manejar errores adecuadamente
        res.status(500).json({ message: "Error al generar informes", error });
    }
});
exports.generateReportsForZones = generateReportsForZones;
