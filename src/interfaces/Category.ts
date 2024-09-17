import mongoose from "mongoose";

interface Category {
  _id?: mongoose.Types.ObjectId | null;
  name: string;
  created_by: mongoose.Types.ObjectId;
}

export default Category;
