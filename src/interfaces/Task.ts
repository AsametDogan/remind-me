import { Schema } from "mongoose";

interface Task {
  title: string;
  description?: string;
  creatorId: Schema.Types.ObjectId;
  createdDate: Date;
  isActive: boolean;
  isFinished: boolean;
}

export default Task;
