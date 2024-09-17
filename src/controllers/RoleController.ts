import { Request, Response } from "express";
import { RoleModel, UserModel } from "../models";
import { ResponseJson } from "../interfaces";

class RoleController {
  create = async (req: Request, res: Response<ResponseJson>) => {
    const { name, role } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ error: "Role ismi  boş olamaz", success: false, data: null });
    }
    try {
      const role = await RoleModel.create({ name });
      return res.status(201).json({
        success: true,
        data: role,
        message: "Role başarıyla oluşturuldu",
      });
    } catch (error) {
      console.log("! Hata Role -> create: " + error);
      return res.status(500).json({
        error: "! Hata Role -> create: " + error,
        success: false,
        data: null,
      });
    }
  };
  delete = async (req: Request, res: Response<ResponseJson>) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "Id boş olamaz",
        success: false,
        data: null,
      });
    }
    try {
      const userRole = await UserModel.findOne({ role_id: id });
      if (userRole) {
        return res.status(400).json({
          error: "Role bağlı kullanıcılar bulunmaktadır",
          success: false,
          data: null,
        });
      }
      const role = await RoleModel.findByIdAndDelete(id);
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
    } catch (error) {
      console.log("! Hata Role -> delete: " + error);
      return res.status(500).json({
        error: "! Hata Role -> delete: " + error,
        success: false,
        data: null,
      });
    }
  };
  rename = async (req: Request, res: Response<ResponseJson>) => {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
      return res
        .status(400)
        .json({ error: "Role ismi boş olamaz", success: false, data: null });
    }
    try {
      const role = await RoleModel.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
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
    } catch (error) {
      console.log("! Hata Role -> rename: " + error);
      return res.status(500).json({
        error: "! Hata Role -> rename: " + error,
        success: false,
        data: null,
      });
    }
  };
  getAll = async (req: Request, res: Response<ResponseJson>) => {
    try {
      const roles = await RoleModel.find();
      return res.status(200).json({
        success: true,
        data: roles,
        message: "Tüm roller başarıyla getirildi",
      });
    } catch (error) {
      console.log("! Hata Role -> getAll: " + error);
      return res.status(500).json({
        error: "! Hata Role -> getAll: " + error,
        success: false,
        data: null,
      });
    }
  };
}

export default RoleController;
