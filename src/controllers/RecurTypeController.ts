import { Request, Response } from "express";
import { EventModel, RecurTypeModel } from "../models";
import { ResponseJson } from "../interfaces";

class RecurTypeController {
  create = async (req: Request, res: Response<ResponseJson>) => {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ error: "Tekrar tipi ismi  boş olamaz", success: false, data: null });
    }
    try {
      const recurType = await RecurTypeModel.create({ name });
      return res.status(201).json({
        success: true,
        data: recurType,
        message: "Tekrar tipi başarıyla oluşturuldu",
      });
    } catch (error) {
      console.log("! Hata RecurType -> create: " + error);
      return res.status(500).json({
        error: "! Hata RecurType -> create: " + error,
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
      const event = await EventModel.findOne({ recur_type_id: id });
      if (event) {
        return res.status(400).json({
          error: "Bu tekrara bağlı kullanıcılar bulunmaktadır",
          success: false,
          data: null,
        });
      }
      const recurType = await RecurTypeModel.findByIdAndDelete(id);
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
    } catch (error) {
      console.log("! Hata RecurType -> delete: " + error);
      return res.status(500).json({
        error: "! Hata RecurType -> delete: " + error,
        success: false,
        data: null,
      });
    }
  };
  rename = async (req: Request, res: Response<ResponseJson>) => {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
      return res.status(400).json({ error: "Tekrar ismi boş olamaz", success: false, data: null });
    }
    try {
      const recurType = await RecurTypeModel.findByIdAndUpdate(id, { name }, { new: true });
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
    } catch (error) {
      console.log("! Hata RecurType -> rename: " + error);
      return res.status(500).json({
        error: "! Hata RecurType -> rename: " + error,
        success: false,
        data: null,
      });
    }
  };
  getAll = async (req: Request, res: Response<ResponseJson>) => {
    try {
      const recurTypes = await RecurTypeModel.find();
      return res.status(200).json({
        success: true,
        data: recurTypes,
        message: "Tüm tekrar tipleri başarıyla getirildi",
      });
    } catch (error) {
      console.log("! Hata RecurType -> getAll: " + error);
      return res.status(500).json({
        error: "! Hata RecurType -> getAll: " + error,
        success: false,
        data: null,
      });
    }
  };
}

export default RecurTypeController;
