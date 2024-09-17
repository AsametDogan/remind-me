import { Request, Response } from "express";
import { EventModel, PriorityModel } from "../models";
import { ResponseJson } from "../interfaces";

class PriorityController {
  create = async (req: Request, res: Response<ResponseJson>) => {
    const { name, color_id } = req.body;
    if (!name || !color_id) {
      return res
        .status(400)
        .json({
          error: "Öncelik ismi veya rengi boş olamaz",
          success: false,
          data: null,
        });
    }
    try {
      const priority = await PriorityModel.create({ name, color_id });
      return res.status(201).json({
        success: true,
        data: priority,
        message: "Öncelik başarıyla oluşturuldu",
      });
    } catch (error) {
      console.log("! Hata Priority -> create: " + error);
      return res.status(500).json({
        error: "! Hata Priority -> create: " + error,
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
      const eventPririty = await EventModel.findOne({ priority_id: id });
      if (eventPririty) {
        return res.status(400).json({
          error: "Önceliğe bağlı Event bulunmaktadır",
          success: false,
          data: null,
        });
      }
      const priority = await PriorityModel.findByIdAndDelete(id);
      if (!priority) {
        return res.status(404).json({
          error: "Öncelik bulunamadı",
          success: false,
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        data: priority,
        message: "Öncelik başarıyla silindi",
      });
    } catch (error) {
      console.log("! Hata Priority -> delete: " + error);
      return res.status(500).json({
        error: "! Hata Priority -> delete: " + error,
        success: false,
        data: null,
      });
    }
  };
  update = async (req: Request, res: Response<ResponseJson>) => {
    const { name, color_id } = req.body;
    const { id } = req.params;
    if (!name || !color_id) {
      return res
        .status(400)
        .json({
          error: "Öncelik ismi veye rengi boş olamaz",
          success: false,
          data: null,
        });
    }
    try {
      const priority = await PriorityModel.findByIdAndUpdate(
        id,
        { name, color_id },
        { new: true }
      );
      if (!priority) {
        return res.status(404).json({
          error: "Öncelik bulunamadı",
          success: false,
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        data: priority,
        message: "Öncelik başarıyla güncellendi",
      });
    } catch (error) {
      console.log("! Hata Priority -> rename: " + error);
      return res.status(500).json({
        error: "! Hata Priority -> rename: " + error,
        success: false,
        data: null,
      });
    }
  };
  getAll = async (req: Request, res: Response<ResponseJson>) => {
    try {
      const priorities = await PriorityModel.find();
      return res.status(200).json({
        success: true,
        data: priorities,
        message: "Tüm Öncelikler başarıyla getirildi",
      });
    } catch (error) {
      console.log("! Hata Priority -> getAll: " + error);
      return res.status(500).json({
        error: "! Hata Priority -> getAll: " + error,
        success: false,
        data: null,
      });
    }
  };
}

export default PriorityController;
