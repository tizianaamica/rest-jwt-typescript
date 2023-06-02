"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const router = (0, express_1.Router)();
router.post("/comment", comment_controller_1.createComment);
router.post("/:commentId/reply", comment_controller_1.addReply);
exports.default = router;
