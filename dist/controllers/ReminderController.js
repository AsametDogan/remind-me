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
class ReminderController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { message, event_id } = req.body;
            if (!message) {
                return res
                    .status(400)
                    .json({
                    error: "Hatırlatıcı mesajı boş olamaz",
                    success: false,
                    data: null,
                });
            }
            try {
                const reminder = yield models_1.ReminderModel.create({ message });
                return res.status(201).json({
                    success: true,
                    data: reminder,
                    message: "Hatırlatıcı başarıyla oluşturuldu",
                });
            }
            catch (error) {
                console.log("! Hata Reminder -> create: " + error);
                return res.status(500).json({
                    error: "! Hata Reminder -> create: " + error,
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
                const reminder = yield models_1.ReminderModel.findByIdAndDelete(id);
                if (!reminder) {
                    return res.status(404).json({
                        error: "Hatırlatıcı bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: reminder,
                    message: "Hatırlatıcı başarıyla silindi",
                });
            }
            catch (error) {
                console.log("! Hata Reminder -> delete: " + error);
                return res.status(500).json({
                    error: "! Hata Reminder -> delete: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { message } = req.body;
            const { id } = req.params;
            if (!message) {
                return res
                    .status(400)
                    .json({ error: "Hatırlatıcı ismi boş olamaz", success: false, data: null });
            }
            try {
                const reminder = yield models_1.ReminderModel.findByIdAndUpdate(id, { message }, { new: true });
                if (!reminder) {
                    return res.status(404).json({
                        error: "Hatırlatıcı bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: reminder,
                    message: "Hatırlatıcı başarıyla güncellendi",
                });
            }
            catch (error) {
                console.log("! Hata Reminder -> rename: " + error);
                return res.status(500).json({
                    error: "! Hata Reminder -> rename: " + error,
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
                console.log("! Hata Reminder -> getAll: " + error);
                return res.status(500).json({
                    error: "! Hata Reminder -> getAll: " + error,
                    success: false,
                    data: null,
                });
            }
        });
    }
}
exports.default = ReminderController;
