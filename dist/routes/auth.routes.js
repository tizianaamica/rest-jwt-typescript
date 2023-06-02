"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_controller_1 = require("../controllers/user.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
router.post("/signup", authMiddleware_1.authMiddleware, user_controller_1.signUp);
router.post("/signin", user_controller_1.signIn);
exports.default = router;
