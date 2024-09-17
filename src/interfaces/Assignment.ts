import mongoose from "mongoose";

interface Assignment {
  owner: mongoose.Types.ObjectId;
  task: mongoose.Types.ObjectId;
  startPoint: number;
  currentPoint: number;
  endPoint?: number;
  startDate: Date;
  endDate?: Date;
  isFinished: boolean;
  isActive: boolean;
  createdDate: Date;
}

export default Assignment;
