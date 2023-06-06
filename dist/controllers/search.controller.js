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
exports.search = void 0;
const zone_1 = __importDefault(require("../models/zone"));
const animal_1 = __importDefault(require("../models/animal"));
const comment_1 = __importDefault(require("../models/comment"));
const reply_1 = __importDefault(require("../models/reply"));
const specie_1 = __importDefault(require("../models/specie"));
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyword = req.query.keyword;
        const searchResults = [];
        const zones = yield zone_1.default.find({
            name: { $regex: keyword, $options: "i" },
        });
        if (zones.length > 0) {
            searchResults.push({ category: "Zonas", results: zones });
        }
        const animals = yield animal_1.default.find({
            $or: [
                { name: { $regex: new RegExp(keyword, "i") } },
                {
                    species: {
                        $in: yield specie_1.default.find({
                            name: { $regex: new RegExp(keyword, "i") },
                        }).distinct("_id"),
                    },
                },
            ],
        });
        if (animals.length > 0) {
            searchResults.push({ category: "Animales", results: animals });
        }
        const comments = yield comment_1.default.find({
            body: { $regex: keyword, $options: "i" },
        });
        const replies = yield reply_1.default.find({
            body: { $regex: keyword, $options: "i" },
        });
        if (comments.length > 0 || replies.length > 0) {
            const combinedResults = [...comments, ...replies];
            searchResults.push({
                category: "Comentarios y Respuestas",
                results: combinedResults,
            });
        }
        res.json(searchResults);
    }
    catch (error) {
        res.status(500).json({ message: "Error searching", error });
    }
});
exports.search = search;
