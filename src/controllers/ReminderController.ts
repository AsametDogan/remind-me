import { Request, Response } from "express";
import { EventModel, ReminderModel, RoleModel, UserModel } from "../models";
import { ResponseJson } from "../interfaces";

class ReminderController {
  create = async (req: Request, res: Response<ResponseJson>) => {
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
      const reminder = await ReminderModel.create({ message });
      return res.status(201).json({
        success: true,
        data: reminder,
        message: "Hatırlatıcı başarıyla oluşturuldu",
      });
    } catch (error) {
      console.log("! Hata Reminder -> create: " + error);
      return res.status(500).json({
        error: "! Hata Reminder -> create: " + error,
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
     
      const reminder = await ReminderModel.findByIdAndDelete(id);
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
    } catch (error) {
      console.log("! Hata Reminder -> delete: " + error);
      return res.status(500).json({
        error: "! Hata Reminder -> delete: " + error,
        success: false,
        data: null,
      });
    }
  };
  update = async (req: Request, res: Response<ResponseJson>) => {
    const {  message } = req.body;
    const { id } = req.params;
    if (!message) {
      return res
        .status(400)
        .json({ error: "Hatırlatıcı ismi boş olamaz", success: false, data: null });
    }
    try {
      const reminder = await ReminderModel.findByIdAndUpdate(
        id,
        { message },
        { new: true }
      );
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
    } catch (error) {
      console.log("! Hata Reminder -> rename: " + error);
      return res.status(500).json({
        error: "! Hata Reminder -> rename: " + error,
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
      console.log("! Hata Reminder -> getAll: " + error);
      return res.status(500).json({
        error: "! Hata Reminder -> getAll: " + error,
        success: false,
        data: null,
      });
    }
  };
}

export default ReminderController;
