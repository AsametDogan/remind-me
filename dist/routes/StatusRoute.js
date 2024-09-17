"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StatusController_1 = __importDefault(require("../controllers/StatusController"));
const statusRouter = (0, express_1.Router)();
const statusController = new StatusController_1.default();
statusRouter.post("/", statusController.create);
statusRouter.get("/", statusController.getAll);
statusRouter.delete("/:id", statusController.delete);
statusRouter.put("/:id", statusController.rename);
exports.default = statusRouter;
