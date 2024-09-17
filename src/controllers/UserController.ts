import { Request, Response } from "express";
import { UserModel } from "../models";
import Standardization from "../helpers/Standardization";
import bcrypt from "bcrypt";
import { RequestWithUser, ResponseJson, TokenByRole } from "../interfaces";
import Validation from "../helpers/Validation";
import jwt from "jsonwebtoken";

class UserController {
  register = async (req: Request, res: Response<ResponseJson>) => {
    try {
      let { name, surname, phone, email, password, username } = req.body;
      if (!name || !surname || !email || !password || !username) {
        return res.status(400).json({
          error: "Tüm alanlar doldurulmalıdır",
          success: false,
          data: null,
        });
      }
      name = Standardization.capitalizeFirst(name);
      surname = Standardization.capitalizeFirst(surname);
      if (phone) {
        phone = Standardization.phone(phone);
      }
      email = Standardization.trim(email);

      if (!Validation.email(email)) {
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

      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          error: "Bu email ile kayıtlı kullanıcı bulunmaktadır",
          success: false,
          data: null,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new UserModel({
        username,
        name,
        surname,
        phone,
        email,
        password: hashedPassword,
      });

      await user.save();
      if (!user._id) {
        return res.status(500).json({
          error: "Kullanıcı oluşturulurken hata oluştu",
          success: false,
          data: null,
        });
      }

      const payload: TokenByRole = { _id: user._id, role_id: user.role_id };
      const token = jwt.sign(payload, process.env.SECRET_TOKEN || "");

      return res.status(200).json({
        success: true,
        data: { user, token },
        message: "Kullanıcı başarıyla oluşturuldu",
      });
    } catch (error) {
      console.log("! Hata User -> create: " + error);
      return res.status(500).json({
        error: "! Hata User -> create: " + error,
        success: false,
        data: null,
      });
    }
  };

  login = async (req: Request, res: Response<ResponseJson>) => {
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
      if (!Validation.email(email)) {
        return res.status(400).json({
          error: "Geçerli bir e-posta adresi giriniz",
          success: false,
          data: null,
        });
      }
      email = Standardization.trim(email);

      //select without password  const user = await UserModel.findOne({ email, isActive: true });

      const user = await UserModel.findOne({
        email,
        //isActive: true,
      });

      if (!user?._id) {
        return res.status(400).json({
          error: "Bu email ile kayıtlı kullanıcı bulunmamaktadır",
          success: false,
          data: null,
        });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(400).json({ error: "Şifre hatalı", success: false, data: null });
      }
      const payload: TokenByRole = { _id: user._id, role_id: user.role_id };
      const token = jwt.sign(payload, process.env.SECRET_TOKEN || "");

      return res
        .status(200)
        .json({ success: true, data: { user, token }, message: "Giriş başarılı" });
    } catch (error) {
      console.log("! Hata User -> login: " + error);
      return res
        .status(500)
        .json({ error: "! Hata User -> login: " + error, success: false, data: null });
    }
  };

  update = async (req: Request, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
      return res.status(401).json({ success: false, error: "Kullanıcı bulunamadı", data: null });
    }
    try {
      let { name, surname, phone, password } = req.body;

      if (password?.length < 6) {
        return res.status(400).json({
          error: "Şifre en az 6 karakter olmalıdır",
          success: false,
          data: null,
        });
      }
      if (phone) {
        phone = Standardization.phone(phone);
      }
      if (name) {
        name = Standardization.capitalizeFirst(name);
      }
      if (surname) {
        surname = Standardization.capitalizeFirst(surname);
      }
      let updatedUser;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedUser = await UserModel.findByIdAndUpdate(
          user._id,
          {
            name: name || user.name,
            surname: surname || user.surname,
            phone: phone || user.phone,
            password: hashedPassword,
          },
          { new: true, select: "-password" }
        );
      } else {
        updatedUser = await UserModel.findByIdAndUpdate(
          user._id,
          {
            name: name || user.name,
            surname: surname || user.surname,
            phone: phone || user.phone,
          },
          { new: true, select: "-password" }
        );
      }

      return res
        .status(200)
        .json({ success: true, data: updatedUser, message: "Kullanıcı güncellendi" });
    } catch (error) {
      console.log("! Hata User -> update: " + error);
      return res
        .status(500)
        .json({ error: "! Hata User -> update: " + error, success: false, data: null });
    }
  };

  delete = async (req: Request, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
      return res.status(401).json({
        success: false,
        error: "Kullanıcı bulunamadı",
        data: null,
      });
    }
    try {
      let foundUser = await UserModel.findById(user._id);
      if (!foundUser) {
        return res.status(404).json({
          success: false,
          error: "Kullanıcı bulunamadı",
          data: null,
        });
      }
      foundUser.is_active = false;
      await foundUser.save();
      return res.status(200).json({
        success: true,
        data: null,
        message: "Kullanıcı silindi",
      });
    } catch (error) {
      console.log("! Hata User -> delete: " + error);

      return res.status(500).json({
        error: "! Hata User -> delete: " + error,
        success: false,
        data: null,
      });
    }
  };

  getMe = async (req: Request, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
      return res.status(401).json({ success: false, error: "Kullanıcı bulunamadı", data: null });
    }
    try {
      const foundUser = await UserModel.findById(user._id);
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
    } catch (error) {
      console.log("! Hata User -> getMe: " + error);
      return res.status(500).json({
        error: "! Hata User -> getMe: " + error,
        success: false,
        data: null,
      });
    }
  };
}

export default UserController;
