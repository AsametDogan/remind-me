import { Request, Response } from "express";
import { CategoryModel, EventModel, StatusModel, UserModel } from "../models";
import { RequestWithUser, ResponseJson } from "../interfaces";

class CategoryController {
  create = async (req: Request, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
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
      const category = await CategoryModel.create({
        name,
        created_by: user._id,
      });
      return res.status(201).json({
        success: true,
        data: category,
        message: "Kategori başarıyla oluşturuldu",
      });
    } catch (error) {
      console.log("! Hata Category -> create: " + error);
      return res.status(500).json({
        error: "! Hata Category -> create: " + error,
        success: false,
        data: null,
      });
    }
  };

  rename = async (req: Request, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
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
      const foundedCategory = await CategoryModel.findById(id);
      if (!foundedCategory) {
        return res.status(404).json({
          error: "kategori bulunamadı",
          success: false,
          data: null,
        });
      }
      if (foundedCategory.created_by?.toString() !== user._id?.toString()) {
        return res.status(401).json({
          error: "Yetkiniz yok",
          success: false,
          data: null,
        });
      }
      foundedCategory.name = name;

      const category = await foundedCategory.save();
      return res.status(200).json({
        success: true,
        data: category,
        message: "kategori başarıyla güncellendi",
      });
    } catch (error) {
      console.log("! Hata Category -> rename: " + error);
      return res.status(500).json({
        error: "! Hata Category -> rename: " + error,
        success: false,
        data: null,
      });
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
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "Id boş olamaz",
        success: false,
        data: null,
      });
    }

    try {
      const foundedCategory = await CategoryModel.findById(id);
      if (
        foundedCategory &&
        foundedCategory.created_by?.toString() !== user._id?.toString()
      ) {
        return res.status(401).json({
          error: "Yetkiniz yok",
          success: false,
          data: null,
        });
      }

      const eventCategory = await EventModel.findOne({ category_id: id });
      if (eventCategory) {
        return res.status(400).json({
          error: "Bu kategoride not bulunmaktadır",
          success: false,
          data: null,
        });
      }

      const category = await CategoryModel.findByIdAndDelete(id);
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
    } catch (error) {
      console.log("! Hata Category -> delete: " + error);
      return res.status(500).json({
        error: "! Hata Category -> delete: " + error,
        success: false,
        data: null,
      });
    }
  };

  getAll = async (req: Request, res: Response<ResponseJson>) => {
    try {
      const categories = await CategoryModel.find();
      return res.status(200).json({
        success: true,
        data: categories,
        message: "Tüm Kategoriler başarıyla getirildi",
      });
    } catch (error) {
      console.log("! Hata Category -> getAll: " + error);
      return res.status(500).json({
        error: "! Hata Category -> getAll: " + error,
        success: false,
        data: null,
      });
    }
  };

  getMyCategories = async (req: Request, res: Response<ResponseJson>) => {
    const user = (req as RequestWithUser).user;
    if (!user?._id) {
      return res.status(401).json({
        success: false,
        error: "Kullanıcı bulunamadı",
        data: null,
      });
    }
    try {
      const categories = await CategoryModel.find({ created_by: user._id });
      return res.status(200).json({
        success: true,
        data: categories,
        message: "Tüm Kategoriler başarıyla getirildi",
      });
    } catch (error) {
      console.log("! Hata Category -> getMyCategories: " + error);
      return res.status(500).json({
        error: "! Hata Category -> getMyCategories: " + error,
        success: false,
        data: null,
      });
    }
  };
}

export default CategoryController;
