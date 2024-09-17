"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PriorityController_1 = __importDefault(require("../controllers/PriorityController"));
const priorityRouter = (0, express_1.Router)();
const priorityController = new PriorityController_1.default();
priorityRouter.post("/", priorityController.create);
priorityRouter.get("/", priorityController.getAll);
priorityRouter.put("/:id", priorityController.update);
priorityRouter.delete("/:id", priorityController.delete);
exports.default = priorityRouter;
