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
exports.addReply = exports.createComment = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, author } = req.body;
        const newComment = new comment_1.default({
            body,
            author,
            date: new Date(),
            replies: [],
        });
        const savedComment = yield newComment.save();
        res.status(201).json(savedComment.toObject());
    }
    catch (error) {
        res.status(500).json({ message: "Error creating comment", error });
    }
});
exports.createComment = createComment;
const addReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const { body, author } = req.body;
        const parentComment = yield comment_1.default.findById(commentId);
        if (!parentComment) {
            return res.status(404).json({ message: "Parent comment not found" });
        }
        const newReply = new comment_1.default({
            body,
            author,
            date: new Date(),
            replies: [],
        });
        parentComment.replies.push(newReply);
        const savedParentComment = yield parentComment.save();
        res.json(savedParentComment.toObject());
    }
    catch (error) {
        res.status(500).json({ message: "Error adding reply", error });
    }
});
exports.addReply = addReply;
