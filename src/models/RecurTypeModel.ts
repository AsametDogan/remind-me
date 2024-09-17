import mongoose, { Schema } from "mongoose";
import { RecurType } from "../interfaces";

interface RecurTypeDoc extends RecurType {}
const recurTypeSchema = new Schema<RecurTypeDoc>({
  name: { type: String, required: true },
});

const RecurTypeModel = mongoose.model<RecurTypeDoc>("RecurType", recurTypeSchema);

export default RecurTypeModel;
