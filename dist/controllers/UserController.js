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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const Standardization_1 = __importDefault(require("../helpers/Standardization"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Validation_1 = __importDefault(require("../helpers/Validation"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, surname, phone, email, password, username } = req.body;
                if (!name || !surname || !email || !password || !username) {
                    return res.status(400).json({
                        error: "Tüm alanlar doldurulmalıdır",
                        success: false,
                        data: null,
                    });
                }
                name = Standardization_1.default.capitalizeFirst(name);
                surname = Standardization_1.default.capitalizeFirst(surname);
                if (phone) {
                    phone = Standardization_1.default.phone(phone);
                }
                email = Standardization_1.default.trim(email);
                if (!Validation_1.default.email(email)) {
                    return res.status(400).json({
                        error: "Geçerli bir e-posta adresi giriniz",
                        success: false,
                        data: null,
                    });
                }
                if (password.length < 6) {
                    return res.status(400).json({
                        error: "Şifre en az 6 karakter olmalıdır",
                        success: false,
                        data: null,
                    });
                }
                const existingUser = yield models_1.UserModel.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({
                        error: "Bu email ile kayıtlı kullanıcı bulunmaktadır",
                        success: false,
                        data: null,
                    });
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const user = new models_1.UserModel({
                    username,
                    name,
                    surname,
                    phone,
                    email,
                    password: hashedPassword,
                });
                yield user.save();
                if (!user._id) {
                    return res.status(500).json({
                        error: "Kullanıcı oluşturulurken hata oluştu",
                        success: false,
                        data: null,
                    });
                }
                const payload = { _id: user._id, role_id: user.role_id };
                const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_TOKEN || "");
                return res.status(200).json({
                    success: true,
                    data: { user, token },
                    message: "Kullanıcı başarıyla oluşturuldu",
                });
            }
            catch (error) {
                console.log("! Hata User -> create: " + error);
                return res.status(500).json({
                    error: "! Hata User -> create: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = req.body;
                console.log("object" + email + password);
                if (!email || !password) {
                    return res.status(400).json({
                        error: "Tüm alanlar doldurulmalıdır",
                        success: false,
                        data: null,
                    });
                }
                if (!Validation_1.default.email(email)) {
                    return res.status(400).json({
                        error: "Geçerli bir e-posta adresi giriniz",
                        success: false,
                        data: null,
                    });
                }
                email = Standardization_1.default.trim(email);
                //select without password  const user = await UserModel.findOne({ email, isActive: true });
                const user = yield models_1.UserModel.findOne({
                    email,
                    //isActive: true,
                });
                if (!(user === null || user === void 0 ? void 0 : user._id)) {
                    return res.status(400).json({
                        error: "Bu email ile kayıtlı kullanıcı bulunmamaktadır",
                        success: false,
                        data: null,
                    });
                }
                const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordMatch) {
                    return res.status(400).json({ error: "Şifre hatalı", success: false, data: null });
                }
                const payload = { _id: user._id, role_id: user.role_id };
                const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_TOKEN || "");
                return res
                    .status(200)
                    .json({ success: true, data: { user, token }, message: "Giriş başarılı" });
            }
            catch (error) {
                console.log("! Hata User -> login: " + error);
                return res
                    .status(500)
                    .json({ error: "! Hata User -> login: " + error, success: false, data: null });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                return res.status(401).json({ success: false, error: "Kullanıcı bulunamadı", data: null });
            }
            try {
                let { name, surname, phone, password } = req.body;
                if ((password === null || password === void 0 ? void 0 : password.length) < 6) {
                    return res.status(400).json({
                        error: "Şifre en az 6 karakter olmalıdır",
                        success: false,
                        data: null,
                    });
                }
                if (phone) {
                    phone = Standardization_1.default.phone(phone);
                }
                if (name) {
                    name = Standardization_1.default.capitalizeFirst(name);
                }
                if (surname) {
                    surname = Standardization_1.default.capitalizeFirst(surname);
                }
                let updatedUser;
                if (password) {
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    updatedUser = yield models_1.UserModel.findByIdAndUpdate(user._id, {
                        name: name || user.name,
                        surname: surname || user.surname,
                        phone: phone || user.phone,
                        password: hashedPassword,
                    }, { new: true, select: "-password" });
                }
                else {
                    updatedUser = yield models_1.UserModel.findByIdAndUpdate(user._id, {
                        name: name || user.name,
                        surname: surname || user.surname,
                        phone: phone || user.phone,
                    }, { new: true, select: "-password" });
                }
                return res
                    .status(200)
                    .json({ success: true, data: updatedUser, message: "Kullanıcı güncellendi" });
            }
            catch (error) {
                console.log("! Hata User -> update: " + error);
                return res
                    .status(500)
                    .json({ error: "! Hata User -> update: " + error, success: false, data: null });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                return res.status(401).json({
                    success: false,
                    error: "Kullanıcı bulunamadı",
                    data: null,
                });
            }
            try {
                let foundUser = yield models_1.UserModel.findById(user._id);
                if (!foundUser) {
                    return res.status(404).json({
                        success: false,
                        error: "Kullanıcı bulunamadı",
                        data: null,
                    });
                }
                foundUser.is_active = false;
                yield foundUser.save();
                return res.status(200).json({
                    success: true,
                    data: null,
                    message: "Kullanıcı silindi",
                });
            }
            catch (error) {
                console.log("! Hata User -> delete: " + error);
                return res.status(500).json({
                    error: "! Hata User -> delete: " + error,
                    success: false,
                    data: null,
                });
            }
        });
        this.getMe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                return res.status(401).json({ success: false, error: "Kullanıcı bulunamadı", data: null });
            }
            try {
                const foundUser = yield models_1.UserModel.findById(user._id);
                if (!foundUser) {
                    return res.status(404).json({
                        success: false,
                        error: "Kullanıcı bulunamadı",
                        data: null,
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: foundUser,
                    message: "Kullanıcı getirildi",
                });
            }
            catch (error) {
                console.log("! Hata User -> getMe: " + error);
                return res.status(500).json({
                    error: "! Hata User -> getMe: " + error,
                    success: false,
                    data: null,
                });
            }
        });
    }
}
exports.default = UserController;
