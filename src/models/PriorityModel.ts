import mongoose, { Schema } from "mongoose";
import { Priority } from "../interfaces";

interface PriorityDoc extends Priority {}
const prioritySchema = new Schema<PriorityDoc>({
  color_id: { type: Schema.Types.ObjectId, ref: "Color", required: true },
  name: { type: String, required: true },
});

const PriorityModel = mongoose.model<PriorityDoc>("Priority", prioritySchema);

export default PriorityModel;
