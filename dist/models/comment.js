"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
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
    replies: {
        type: [mongoose_1.Schema.Types.DocumentArray],
        default: [],
    },
});
exports.default = (0, mongoose_1.model)("Comment", commentSchema);
