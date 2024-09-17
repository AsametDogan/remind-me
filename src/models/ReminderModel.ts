import mongoose, { Schema } from "mongoose";
import {  Reminder } from "../interfaces";
interface ReminderDoc extends Reminder {}

const reminderSchema = new Schema<ReminderDoc>({
    event_id: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    message: { type: String, required: true },      
});

const ReminderModel = mongoose.model<ReminderDoc>("Reminder", reminderSchema);

export default ReminderModel;
