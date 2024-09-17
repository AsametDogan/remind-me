import { Request, Response } from "express";
import { EventModel, StatusModel, UserModel } from "../models";
import { ResponseJson } from "../interfaces";

class StatusController {
  create = async (req: Request, res: Response<ResponseJson>) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Durum ismi boş olamaz", success: false, data: null });
    }
    try {
      const status = await StatusModel.create({ name });
      return res.status(201).json({
        success: true,
        data: status,
        message: "Durum başarıyla oluşturuldu",
      });
    } catch (error) {
      console.log("! Hata Status -> create: " + error);
      return res.status(500).json({
        error: "! Hata Status -> create: " + error,
        success: false,
        data: null,
      });
    }
  };

  rename = async (req: Request, res: Response<ResponseJson>) => {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
      return res.status(400).json({ error: "Durum ismi boş olamaz", success: false, data: null });
    }
    try {
      const status = await StatusModel.findByIdAndUpdate(id, { name }, { new: true });
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
    } catch (error) {
      console.log("! Hata Status -> rename: " + error);
      return res.status(500).json({
        error: "! Hata Status -> rename: " + error,
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
      const event = await EventModel.findOne({ status_id: id });
      if (event) {
        return res.status(400).json({
          error: "Duruma bağlı ilişki bulunmaktadır",
          success: false,
          data: null,
        });
      }

      const status = await StatusModel.findByIdAndDelete(id);
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
    } catch (error) {
      console.log("! Hata Durum -> delete: " + error);
      return res.status(500).json({
        error: "! Hata Durum -> delete: " + error,
        success: false,
        data: null,
      });
    }
  };

  getAll = async (req: Request, res: Response<ResponseJson>) => {
    try {
      const status = await StatusModel.find();
      return res.status(200).json({
        success: true,
        data: status,
        message: "Tüm durumlar başarıyla getirildi",
      });
    } catch (error) {
      console.log("! Hata Status -> getAll: " + error);
      return res.status(500).json({
        error: "! Hata Status -> getAll: " + error,
        success: false,
        data: null,
      });
    }
  };
}

export default StatusController;
