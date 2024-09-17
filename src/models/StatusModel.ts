import mongoose, { Schema } from "mongoose";
import { Status } from "../interfaces";

interface StatusDoc extends Status {}
const statusSchema = new Schema<StatusDoc>({
  name: { type: String, required: true },
});

const StatusModel = mongoose.model<StatusDoc>("Status", statusSchema);

export default StatusModel;
