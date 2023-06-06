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
exports.getResponsePercentage = exports.getRepliesByCommentId = exports.getComments = exports.addReply = exports.createComment = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const animal_1 = __importDefault(require("../models/animal"));
const reply_1 = __importDefault(require("../models/reply"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, author, animalId } = req.body;
        const animal = yield animal_1.default.findById(animalId);
        if (!animal) {
            return res.status(404).json({ message: "Animal not found" });
        }
        const newComment = new comment_1.default({
            body,
            author,
            animal: animal._id,
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
        const newReply = new reply_1.default({
            body,
            author,
            date: new Date(),
            comment: parentComment._id,
        });
        const savedReply = yield newReply.save();
        parentComment.replies.push(savedReply._id);
        const savedParentComment = yield parentComment.save();
        res.json(savedParentComment.toObject());
    }
    catch (error) {
        res.status(500).json({ message: "Error adding reply", error });
    }
});
exports.addReply = addReply;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield comment_1.default.find();
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving comments", error });
    }
});
exports.getComments = getComments;
const getRepliesByCommentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const replies = yield reply_1.default.find({ comment: commentId });
        res.json(replies);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving replies", error });
    }
});
exports.getRepliesByCommentId = getRepliesByCommentId;
const getResponsePercentage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalComments = yield comment_1.default.countDocuments();
        const commentsWithReplies = yield comment_1.default.countDocuments({
            replies: { $exists: true, $not: { $size: 0 } },
        });
        const responsePercentage = (commentsWithReplies / totalComments) * 100;
        res.json({ responsePercentage });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error retrieving response percentage", error });
    }
});
exports.getResponsePercentage = getResponsePercentage;
