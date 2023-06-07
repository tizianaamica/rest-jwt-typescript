"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_controller_1 = require("../controllers/user.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddlewares_1 = require("../middlewares/validationMiddlewares");
const validatations_1 = require("../utils/validatations");
router.post("/signup", (0, validationMiddlewares_1.validation)(validatations_1.emailValidate), authMiddleware_1.authMiddleware, user_controller_1.signUp);
router.post("/signin", (0, validationMiddlewares_1.validation)(validatations_1.emailValidate), user_controller_1.signIn);
exports.default = router;
