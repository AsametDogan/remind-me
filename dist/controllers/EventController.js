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
class EventController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                return res.status(401).json({
                    success: false,
                    error: "Kullanıcı bulunamadı",
                    data: null,
                });
            }
            const { title, content, start_time, end_time, priority_id, status_id, recur_type_id, category_id, color_id, } = req.body;
            if (!title ||
                !content ||
                !start_time ||
                !end_time ||
                !priority_id ||
                !status_id ||
                !recur_type_id ||
                !category_id ||
                !color_id) {
                return res
                    .status(400)
                    .json({ error: "Boş bilgi olamaz", success: false, data: null });
            }
            try {
                const event = yield models_1.EventModel.create({
                    title,
                    content,
                    start_time,
                    end_time,
                    priority_id,
                    status_id,
                    recur_type_id,
                    category_id,
                    color_id,
                    user_id: user._id,
                });
                return res.status(201).json({
                    success: true,
                    data: event,
                    message: "Not başarıyla oluşturuldu",
                });
            }
            catch (error) {
                console.log("! Hata Event -> create: " + error);
                return res.status(500).json({
                    error: "! Hata Event -> create: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.getMyEvents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                return res.status(401).json({
                    success: false,
                    error: "Kullanıcı bulunamadı",
                    data: null,
                });
            }
            try {
                const events = yield models_1.EventModel.find({ user_id: user._id });
                return res.status(200).json({
                    success: true,
                    data: events,
                    message: "Tüm notlar başarıyla getirildi",
                });
            }
            catch (error) {
                console.log("! Hata Event -> getMyEvents: " + error);
                return res.status(500).json({
                    error: "! Hata Event -> getMyEvents: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.updateEvent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                return res.status(401).json({
                    success: false,
                    error: "Kullanıcı bulunamadı",
                    data: null,
                });
            }
            const { title, content, start_time, end_time, priority_id, status_id, recur_type_id, category_id, color_id, } = req.body;
            const { id } = req.params;
            if (!title ||
                !content ||
                !start_time ||
                !end_time ||
                !priority_id ||
                !status_id ||
                !recur_type_id ||
                !category_id ||
                !color_id) {
                return res
                    .status(400)
                    .json({ error: "Boş bilgi olamaz", success: false, data: null });
            }
            try {
                const event = yield models_1.EventModel.findByIdAndUpdate(id, {
                    title,
                    content,
                    start_time,
                    end_time,
                    priority_id,
                    status_id,
                    recur_type_id,
                    category_id,
                    color_id,
                }, { new: true });
                if (!event) {
                    return res.status(404).json({
                        error: "Not bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: event,
                    message: "Not başarıyla güncellendi",
                });
            }
            catch (error) {
                console.log("! Hata Event -> updateEvent: " + error);
                return res.status(500).json({
                    error: "! Hata Event -> updateEvent: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.deleteEvent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                return res.status(401).json({
                    success: false,
                    error: "Kullanıcı bulunamadı",
                    data: null,
                });
            }
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    error: "Id boş olamaz",
                    success: false,
                    data: null,
                });
            }
            try {
                try {
                    const reminder = yield models_1.ReminderModel.findOneAndDelete({ event_id: id });
                }
                catch (error) { }
                const event = yield models_1.EventModel.findByIdAndDelete(id);
                if (!event) {
                    return res.status(404).json({
                        error: "Not bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: event,
                    message: "Not başarıyla silindi",
                });
            }
            catch (error) {
                console.log("! Hata Event -> deleteEvent: " + error);
                return res.status(500).json({
                    error: "! Hata Event -> deleteEvent: " + error,
                    success: false,
                    data: null,
                });
            }
        });
    }
}
exports.default = EventController;
