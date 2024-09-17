"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RoleController_1 = __importDefault(require("../controllers/RoleController"));
const roleRouter = (0, express_1.Router)();
const roleController = new RoleController_1.default();
roleRouter.post("/", roleController.create);
roleRouter.get("/", roleController.getAll);
roleRouter.put("/:id", roleController.rename);
roleRouter.delete("/:id", roleController.delete);
exports.default = roleRouter;
