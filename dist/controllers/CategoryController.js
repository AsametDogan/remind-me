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
class CategoryController {
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
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({
                    error: "Kategori ismi boş olamaz",
                    success: false,
                    data: null,
                });
            }
            try {
                const category = yield models_1.CategoryModel.create({
                    name,
                    created_by: user._id,
                });
                return res.status(201).json({
                    success: true,
                    data: category,
                    message: "Kategori başarıyla oluşturuldu",
                });
            }
            catch (error) {
                console.log("! Hata Category -> create: " + error);
                return res.status(500).json({
                    error: "! Hata Category -> create: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.rename = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const user = req.user;
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                return res.status(401).json({
                    success: false,
                    error: "Kullanıcı bulunamadı",
                    data: null,
                });
            }
            const { name } = req.body;
            const { id } = req.params;
            if (!name) {
                return res.status(400).json({
                    error: "Kategori ismi boş olamaz",
                    success: false,
                    data: null,
                });
            }
            try {
                const foundedCategory = yield models_1.CategoryModel.findById(id);
                if (!foundedCategory) {
                    return res.status(404).json({
                        error: "kategori bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                if (((_a = foundedCategory.created_by) === null || _a === void 0 ? void 0 : _a.toString()) !== ((_b = user._id) === null || _b === void 0 ? void 0 : _b.toString())) {
                    return res.status(401).json({
                        error: "Yetkiniz yok",
                        success: false,
                        data: null,
                    });
                }
                foundedCategory.name = name;
                const category = yield foundedCategory.save();
                return res.status(200).json({
                    success: true,
                    data: category,
                    message: "kategori başarıyla güncellendi",
                });
            }
            catch (error) {
                console.log("! Hata Category -> rename: " + error);
                return res.status(500).json({
                    error: "! Hata Category -> rename: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
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
                const foundedCategory = yield models_1.CategoryModel.findById(id);
                if (foundedCategory &&
                    ((_a = foundedCategory.created_by) === null || _a === void 0 ? void 0 : _a.toString()) !== ((_b = user._id) === null || _b === void 0 ? void 0 : _b.toString())) {
                    return res.status(401).json({
                        error: "Yetkiniz yok",
                        success: false,
                        data: null,
                    });
                }
                const eventCategory = yield models_1.EventModel.findOne({ category_id: id });
                if (eventCategory) {
                    return res.status(400).json({
                        error: "Bu kategoride not bulunmaktadır",
                        success: false,
                        data: null,
                    });
                }
                const category = yield models_1.CategoryModel.findByIdAndDelete(id);
                if (!category) {
                    return res.status(404).json({
                        error: "kategori bulunamadı",
                        success: false,
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: status,
                    message: "kategori başarıyla silindi",
                });
            }
            catch (error) {
                console.log("! Hata Category -> delete: " + error);
                return res.status(500).json({
                    error: "! Hata Category -> delete: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield models_1.CategoryModel.find();
                return res.status(200).json({
                    success: true,
                    data: categories,
                    message: "Tüm Kategoriler başarıyla getirildi",
                });
            }
            catch (error) {
                console.log("! Hata Category -> getAll: " + error);
                return res.status(500).json({
                    error: "! Hata Category -> getAll: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.getMyCategories = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                return res.status(401).json({
                    success: false,
                    error: "Kullanıcı bulunamadı",
                    data: null,
                });
            }
            try {
                const categories = yield models_1.CategoryModel.find({ created_by: user._id });
                return res.status(200).json({
                    success: true,
                    data: categories,
                    message: "Tüm Kategoriler başarıyla getirildi",
                });
            }
            catch (error) {
                console.log("! Hata Category -> getMyCategories: " + error);
                return res.status(500).json({
                    error: "! Hata Category -> getMyCategories: " + error,
                    success: false,
                    data: null,
                });
            }
        });
    }
}
exports.default = CategoryController;
