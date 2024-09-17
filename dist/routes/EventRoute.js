"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EventController_1 = __importDefault(require("../controllers/EventController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const eventRouter = (0, express_1.Router)();
const eventController = new EventController_1.default();
eventRouter.post("/", (0, authMiddleware_1.authMiddleware)([]), eventController.create);
eventRouter.get("/", eventController.getMyEvents);
eventRouter.put("/:id", eventController.updateEvent);
eventRouter.delete("/:id", eventController.deleteEvent);
exports.default = eventRouter;
