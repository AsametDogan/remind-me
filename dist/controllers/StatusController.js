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
class StatusController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ error: "Durum ismi boş olamaz", success: false, data: null });
            }
            try {
                const status = yield models_1.StatusModel.create({ name });
                return res.status(201).json({
                    success: true,
                    data: status,
                    message: "Durum başarıyla oluşturuldu",
                });
            }
            catch (error) {
                console.log("! Hata Status -> create: " + error);
                return res.status(500).json({
                    error: "! Hata Status -> create: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.rename = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const { id } = req.params;
            if (!name) {
                return res.status(400).json({ error: "Durum ismi boş olamaz", success: false, data: null });
            }
            try {
                const status = yield models_1.StatusModel.findByIdAndUpdate(id, { name }, { new: true });
                if (!status) {
                    return res.status(404).json({
                        error: "Durum bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: status,
                    message: "Durum başarıyla güncellendi",
                });
            }
            catch (error) {
                console.log("! Hata Status -> rename: " + error);
                return res.status(500).json({
                    error: "! Hata Status -> rename: " + error,
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
                const event = yield models_1.EventModel.findOne({ status_id: id });
                if (event) {
                    return res.status(400).json({
                        error: "Duruma bağlı ilişki bulunmaktadır",
                        success: false,
                        data: null,
                    });
                }
                const status = yield models_1.StatusModel.findByIdAndDelete(id);
                if (!status) {
                    return res.status(404).json({
                        error: "Durum bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: status,
                    message: "Durum başarıyla silindi",
                });
            }
            catch (error) {
                console.log("! Hata Durum -> delete: " + error);
                return res.status(500).json({
                    error: "! Hata Durum -> delete: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const status = yield models_1.StatusModel.find();
                return res.status(200).json({
                    success: true,
                    data: status,
                    message: "Tüm durumlar başarıyla getirildi",
                });
            }
            catch (error) {
                console.log("! Hata Status -> getAll: " + error);
                return res.status(500).json({
                    error: "! Hata Status -> getAll: " + error,
                    success: false,
                    data: null,
                });
            }
        });
    }
}
exports.default = StatusController;
