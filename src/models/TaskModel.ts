import mongoose, { Schema, Document } from "mongoose";
import { Task } from "../interfaces";

interface TaskDoc extends Task, Document {}

const TaskSchema: Schema<TaskDoc> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User schema
    createdDate: { type: Date, default: Date.now },
    isFinished: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
});

const TaskModel = mongoose.model<TaskDoc>("Task", TaskSchema);

export default TaskModel;
