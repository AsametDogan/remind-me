"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userRouter = (0, express_1.Router)();
const userController = new UserController_1.default();
userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.put("/", (0, authMiddleware_1.authMiddleware)([]), userController.update);
// userRouter.delete("/", authMiddleware([""]), userController.delete);
userRouter.get("/", (0, authMiddleware_1.authMiddleware)([]), userController.getMe);
exports.default = userRouter;
