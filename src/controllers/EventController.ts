import { Request, Response } from "express";
import { RequestWithUser, ResponseJson } from "../interfaces";
import { EventModel, ReminderModel } from "../models";

class EventController {
  create = async (req: Request, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
      return res.status(401).json({
        success: false,
        error: "Kullanıcı bulunamadı",
        data: null,
      });
    }

    const {
      title,
      content,
      start_time,
      end_time,
      priority_id,
      status_id,
      recur_type_id,
      category_id,
      color_id,
    } = req.body;
    if (
      !title ||
      !content ||
      !start_time ||
      !end_time ||
      !priority_id ||
      !status_id ||
      !recur_type_id ||
      !category_id ||
      !color_id
    ) {
      return res
        .status(400)
        .json({ error: "Boş bilgi olamaz", success: false, data: null });
    }
    try {
      const event = await EventModel.create({
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
    } catch (error) {
      console.log("! Hata Event -> create: " + error);
      return res.status(500).json({
        error: "! Hata Event -> create: " + error,
        success: false,
        data: null,
      });
    }
  };
  getMyEvents = async (req: Request, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
      return res.status(401).json({
        success: false,
        error: "Kullanıcı bulunamadı",
        data: null,
      });
    }
    try {
      const events = await EventModel.find({ user_id: user._id });
      return res.status(200).json({
        success: true,
        data: events,
        message: "Tüm notlar başarıyla getirildi",
      });
    } catch (error) {
      console.log("! Hata Event -> getMyEvents: " + error);
      return res.status(500).json({
        error: "! Hata Event -> getMyEvents: " + error,
        success: false,
        data: null,
      });
    }
  };
  updateEvent = async (req: Request, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
      return res.status(401).json({
        success: false,
        error: "Kullanıcı bulunamadı",
        data: null,
      });
    }
    const {
      title,
      content,
      start_time,
      end_time,
      priority_id,
      status_id,
      recur_type_id,
      category_id,
      color_id,
    } = req.body;
    const { id } = req.params;
    if (
      !title ||
      !content ||
      !start_time ||
      !end_time ||
      !priority_id ||
      !status_id ||
      !recur_type_id ||
      !category_id ||
      !color_id
    ) {
      return res
        .status(400)
        .json({ error: "Boş bilgi olamaz", success: false, data: null });
    }
    try {
      const event = await EventModel.findByIdAndUpdate(
        id,
        {
          title,
          content,
          start_time,
          end_time,
          priority_id,
          status_id,
          recur_type_id,
          category_id,
          color_id,
        },
        { new: true }
      );
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
    } catch (error) {
      console.log("! Hata Event -> updateEvent: " + error);
      return res.status(500).json({
        error: "! Hata Event -> updateEvent: " + error,
        success: false,
        data: null,
      });
    }
  };
  deleteEvent = async (req: Request, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
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
        const reminder = await ReminderModel.findOneAndDelete({ event_id: id });
      } catch (error) {}
      const event = await EventModel.findByIdAndDelete(id);
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
    } catch (error) {
      console.log("! Hata Event -> deleteEvent: " + error);
      return res.status(500).json({
        error: "! Hata Event -> deleteEvent: " + error,
        success: false,
        data: null,
      });
    }
  };
}
export default EventController;
