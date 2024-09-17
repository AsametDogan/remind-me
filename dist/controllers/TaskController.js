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
// title: string;
// description?: string;
// createdDate: Date;
// isActive: boolean;
class TaskController {
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
            try {
                const { title, description } = req.body;
                if (!title) {
                    return res.status(400).json({
                        error: "Tüm alanlar doldurulmalıdır",
                        success: false,
                        data: null,
                    });
                }
                const task = new models_1.TaskModel({
                    title,
                    description,
                    creatorId: user._id,
                });
                yield task.save();
                return res.status(200).json({
                    success: true,
                    data: task,
                    message: "Task başarıyla oluşturuldu",
                });
            }
            catch (error) {
                console.log("! Hata Task -> create: " + error);
                return res.status(500).json({
                    error: "! Hata Task -> create: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield models_1.TaskModel.find();
                return res.status(200).json({
                    success: true,
                    data: tasks,
                    message: "Tüm tasklar başarıyla getirildi",
                });
            }
            catch (error) {
                console.log("! Hata Task -> getAll: " + error);
                return res.status(500).json({
                    error: "! Hata Task -> getAll: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                return res.status(401).json({
                    success: false,
                    error: "Kullanıcı bulunamadı",
                    data: null,
                });
            }
            try {
                const { id } = req.params;
                const task = yield models_1.TaskModel.findById(id);
                if (!task) {
                    return res.status(404).json({
                        error: "Task bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: task,
                    message: "Task başarıyla getirildi",
                });
            }
            catch (error) {
                console.log("! Hata Task -> getOne: " + error);
                return res.status(500).json({
                    error: "! Hata Task -> getOne: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                return res.status(401).json({
                    success: false,
                    error: "Kullanıcı bulunamadı",
                    data: null,
                });
            }
            try {
                const { id } = req.params;
                const { title, description } = req.body;
                const task = yield models_1.TaskModel.findByIdAndUpdate(id, {
                    title,
                    description,
                }, { new: true });
                if (!task) {
                    return res.status(404).json({
                        error: "Task bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: task,
                    message: "Task başarıyla güncellendi",
                });
            }
            catch (error) {
                console.log("! Hata Task -> update: " + error);
                return res.status(500).json({
                    error: "! Hata Task -> update: " + error,
                    success: false,
                    data: null,
                });
            }
        });
    }
}
exports.default = TaskController;
