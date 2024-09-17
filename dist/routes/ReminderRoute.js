"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReminderController_1 = __importDefault(require("../controllers/ReminderController"));
const reminderRouter = (0, express_1.Router)();
const reminderController = new ReminderController_1.default();
reminderRouter.post("/", reminderController.create);
reminderRouter.get("/", reminderController.getAll);
reminderRouter.put("/:id", reminderController.update);
reminderRouter.delete("/:id", reminderController.delete);
exports.default = reminderRouter;
