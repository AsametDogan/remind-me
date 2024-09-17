"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const categoryRouter = (0, express_1.Router)();
const categoryController = new CategoryController_1.default();
categoryRouter.post("/", (0, authMiddleware_1.authMiddleware)([]), categoryController.create);
categoryRouter.get("/", (0, authMiddleware_1.authMiddleware)([]), categoryController.getMyCategories);
categoryRouter.put("/:id", categoryController.rename);
categoryRouter.delete("/:id", categoryController.delete);
categoryRouter.get("/all", categoryController.getAll);
exports.default = categoryRouter;
