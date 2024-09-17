import { Request, Response } from "express";
import { TaskModel } from "../models";
import { RequestWithUser, ResponseJson } from "../interfaces";

// title: string;
// description?: string;
// createdDate: Date;
// isActive: boolean;

class TaskController {
  create = async (req: RequestWithUser, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
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
      const task = new TaskModel({
        title,
        description,
        creatorId: user._id,
      });

      await task.save();

      return res.status(200).json({
        success: true,
        data: task,
        message: "Task başarıyla oluşturuldu",
      });
    } catch (error) {
      console.log("! Hata Task -> create: " + error);

      return res.status(500).json({
        error: "! Hata Task -> create: " + error,
        success: false,
        data: null,
      });
    }
  };

  getAll = async (req: RequestWithUser, res: Response<ResponseJson>) => {
    try {
      const tasks = await TaskModel.find();

      return res.status(200).json({
        success: true,
        data: tasks,
        message: "Tüm tasklar başarıyla getirildi",
      });
    } catch (error) {
      console.log("! Hata Task -> getAll: " + error);

      return res.status(500).json({
        error: "! Hata Task -> getAll: " + error,
        success: false,
        data: null,
      });
    }
  };

  getOne = async (req: RequestWithUser, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
      return res.status(401).json({
        success: false,
        error: "Kullanıcı bulunamadı",
        data: null,
      });
    }
    try {
      const { id } = req.params;
      const task = await TaskModel.findById(id);
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
    } catch (error) {
      console.log("! Hata Task -> getOne: " + error);

      return res.status(500).json({
        error: "! Hata Task -> getOne: " + error,
        success: false,
        data: null,
      });
    }
  };

  update = async (req: RequestWithUser, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
      return res.status(401).json({
        success: false,
        error: "Kullanıcı bulunamadı",
        data: null,
      });
    }
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const task = await TaskModel.findByIdAndUpdate(
        id,
        {
          title,
          description,
        },
        { new: true }
      );
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
    } catch (error) {
      console.log("! Hata Task -> update: " + error);

      return res.status(500).json({
        error: "! Hata Task -> update: " + error,
        success: false,
        data: null,
      });
    }
  };
}
export default TaskController;
