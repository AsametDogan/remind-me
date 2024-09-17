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
class RecurTypeController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            if (!name) {
                return res
                    .status(400)
                    .json({ error: "Tekrar tipi ismi  boş olamaz", success: false, data: null });
            }
            try {
                const recurType = yield models_1.RecurTypeModel.create({ name });
                return res.status(201).json({
                    success: true,
                    data: recurType,
                    message: "Tekrar tipi başarıyla oluşturuldu",
                });
            }
            catch (error) {
                console.log("! Hata RecurType -> create: " + error);
                return res.status(500).json({
                    error: "! Hata RecurType -> create: " + error,
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
                const event = yield models_1.EventModel.findOne({ recur_type_id: id });
                if (event) {
                    return res.status(400).json({
                        error: "Bu tekrara bağlı kullanıcılar bulunmaktadır",
                        success: false,
                        data: null,
                    });
                }
                const recurType = yield models_1.RecurTypeModel.findByIdAndDelete(id);
                if (!recurType) {
                    return res.status(404).json({
                        error: "Tekrar tipi bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: recurType,
                    message: "Tekrar tipi başarıyla silindi",
                });
            }
            catch (error) {
                console.log("! Hata RecurType -> delete: " + error);
                return res.status(500).json({
                    error: "! Hata RecurType -> delete: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.rename = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const { id } = req.params;
            if (!name) {
                return res.status(400).json({ error: "Tekrar ismi boş olamaz", success: false, data: null });
            }
            try {
                const recurType = yield models_1.RecurTypeModel.findByIdAndUpdate(id, { name }, { new: true });
                if (!recurType) {
                    return res.status(404).json({
                        error: "Tekrar tipi bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: recurType,
                    message: "Tekrar tipi başarıyla güncellendi",
                });
            }
            catch (error) {
                console.log("! Hata RecurType -> rename: " + error);
                return res.status(500).json({
                    error: "! Hata RecurType -> rename: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const recurTypes = yield models_1.RecurTypeModel.find();
                return res.status(200).json({
                    success: true,
                    data: recurTypes,
                    message: "Tüm tekrar tipleri başarıyla getirildi",
                });
            }
            catch (error) {
                console.log("! Hata RecurType -> getAll: " + error);
                return res.status(500).json({
                    error: "! Hata RecurType -> getAll: " + error,
                    success: false,
                    data: null,
                });
            }
        });
    }
}
exports.default = RecurTypeController;
