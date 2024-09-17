import mongoose, { Schema } from "mongoose";
import { Category } from "../interfaces";

interface CategoryDoc extends Category {}
const categorySchema = new Schema<CategoryDoc>({
  name: { type: String, required: true },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const CategoryModel = mongoose.model<CategoryDoc>("Category", categorySchema);

export default CategoryModel;
