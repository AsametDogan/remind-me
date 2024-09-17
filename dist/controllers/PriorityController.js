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
class PriorityController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, color_id } = req.body;
            if (!name || !color_id) {
                return res
                    .status(400)
                    .json({
                    error: "Öncelik ismi veya rengi boş olamaz",
                    success: false,
                    data: null,
                });
            }
            try {
                const priority = yield models_1.PriorityModel.create({ name, color_id });
                return res.status(201).json({
                    success: true,
                    data: priority,
                    message: "Öncelik başarıyla oluşturuldu",
                });
            }
            catch (error) {
                console.log("! Hata Priority -> create: " + error);
                return res.status(500).json({
                    error: "! Hata Priority -> create: " + error,
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
                const eventPririty = yield models_1.EventModel.findOne({ priority_id: id });
                if (eventPririty) {
                    return res.status(400).json({
                        error: "Önceliğe bağlı Event bulunmaktadır",
                        success: false,
                        data: null,
                    });
                }
                const priority = yield models_1.PriorityModel.findByIdAndDelete(id);
                if (!priority) {
                    return res.status(404).json({
                        error: "Öncelik bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: priority,
                    message: "Öncelik başarıyla silindi",
                });
            }
            catch (error) {
                console.log("! Hata Priority -> delete: " + error);
                return res.status(500).json({
                    error: "! Hata Priority -> delete: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, color_id } = req.body;
            const { id } = req.params;
            if (!name || !color_id) {
                return res
                    .status(400)
                    .json({
                    error: "Öncelik ismi veye rengi boş olamaz",
                    success: false,
                    data: null,
                });
            }
            try {
                const priority = yield models_1.PriorityModel.findByIdAndUpdate(id, { name, color_id }, { new: true });
                if (!priority) {
                    return res.status(404).json({
                        error: "Öncelik bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: priority,
                    message: "Öncelik başarıyla güncellendi",
                });
            }
            catch (error) {
                console.log("! Hata Priority -> rename: " + error);
                return res.status(500).json({
                    error: "! Hata Priority -> rename: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const priorities = yield models_1.PriorityModel.find();
                return res.status(200).json({
                    success: true,
                    data: priorities,
                    message: "Tüm Öncelikler başarıyla getirildi",
                });
            }
            catch (error) {
                console.log("! Hata Priority -> getAll: " + error);
                return res.status(500).json({
                    error: "! Hata Priority -> getAll: " + error,
                    success: false,
                    data: null,
                });
            }
        });
    }
}
exports.default = PriorityController;
