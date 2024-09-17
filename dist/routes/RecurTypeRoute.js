"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RecurTypeController_1 = __importDefault(require("../controllers/RecurTypeController"));
const recurTypeRouter = (0, express_1.Router)();
const recurTypeController = new RecurTypeController_1.default();
recurTypeRouter.post("/", recurTypeController.create);
recurTypeRouter.get("/", recurTypeController.getAll);
recurTypeRouter.put("/:id", recurTypeController.rename);
recurTypeRouter.delete("/:id", recurTypeController.delete);
exports.default = recurTypeRouter;
