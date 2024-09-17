"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class RoleController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, role } = req.body;
            if (!name) {
                return res
                    .status(400)
                    .json({ error: "Role ismi  boş olamaz", success: false, data: null });
            }
            try {
                const role = yield models_1.RoleModel.create({ name });
                return res.status(201).json({
                    success: true,
                    data: role,
                    message: "Role başarıyla oluşturuldu",
                });
            }
            catch (error) {
                console.log("! Hata Role -> create: " + error);
                return res.status(500).json({
                    error: "! Hata Role -> create: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    error: "Id boş olamaz",
                    success: false,
                    data: null,
                });
            }
            try {
                const userRole = yield models_1.UserModel.findOne({ role_id: id });
                if (userRole) {
                    return res.status(400).json({
                        error: "Role bağlı kullanıcılar bulunmaktadır",
                        success: false,
                        data: null,
                    });
                }
                const role = yield models_1.RoleModel.findByIdAndDelete(id);
                if (!role) {
                    return res.status(404).json({
                        error: "Role bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: role,
                    message: "Role başarıyla silindi",
                });
            }
            catch (error) {
                console.log("! Hata Role -> delete: " + error);
                return res.status(500).json({
                    error: "! Hata Role -> delete: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.rename = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const { id } = req.params;
            if (!name) {
                return res
                    .status(400)
                    .json({ error: "Role ismi boş olamaz", success: false, data: null });
            }
            try {
                const role = yield models_1.RoleModel.findByIdAndUpdate(id, { name }, { new: true });
                if (!role) {
                    return res.status(404).json({
                        error: "Role bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: role,
                    message: "Role başarıyla güncellendi",
                });
            }
            catch (error) {
                console.log("! Hata Role -> rename: " + error);
                return res.status(500).json({
                    error: "! Hata Role -> rename: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield models_1.RoleModel.find();
                return res.status(200).json({
                    success: true,
                    data: roles,
                    message: "Tüm roller başarıyla getirildi",
                });
            }
            catch (error) {
                console.log("! Hata Role -> getAll: " + error);
                return res.status(500).json({
                    error: "! Hata Role -> getAll: " + error,
                    success: false,
                    data: null,
                });
            }
        });
    }
}
exports.default = RoleController;
