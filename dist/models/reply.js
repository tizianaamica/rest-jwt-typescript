"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const replySchema = new mongoose_1.Schema({
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    comment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
        validate: {
            validator: (value) => typeof value === "string" || value instanceof mongoose_1.Types.ObjectId,
            message: "Invalid comment",
        },
    },
});
exports.default = (0, mongoose_1.model)("Reply", replySchema);
