"use strict";
// src/middleware/authMiddleware.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const authMiddleware = (allowedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - Token sağlanmadı " });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN || "");
            if (!decoded) {
                return res.status(401).json({ error: "Unauthorized - Geçersiz token" });
            }
            const role = yield models_1.RoleModel.findById(decoded.role_id);
            if (allowedRoles.length > 0) {
                if (!allowedRoles.includes((role === null || role === void 0 ? void 0 : role.name) || "")) {
                    return res.status(403).json({ error: "Forbidden - Yetkisiz erişim" });
                }
            }
            const foundUser = yield models_1.UserModel.findById(decoded._id);
            if (!foundUser) {
                return res.status(404).json({ message: "authMiddleware - Kullanıcı bulunamadı" });
            }
            req.user = foundUser;
            next();
        }
        catch (error) {
            return res.status(401).json({ error: "Unauthorized - Geçersiz token" });
        }
    });
};
exports.authMiddleware = authMiddleware;
