import mongoose, { Schema } from "mongoose";
import { EventNote } from "../interfaces";
interface EventNoteDoc extends EventNote {}

const eventSchema = new Schema<EventNoteDoc>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  priority_id: { type: Schema.Types.ObjectId, ref: "Priority", required: true },
  status_id: { type: Schema.Types.ObjectId, ref: "Status", required: true },
  recur_type_id: {
    type: Schema.Types.ObjectId,
    ref: "RecurType",
    required: true,
  },
  category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  color_id: { type: Schema.Types.ObjectId, ref: "Color", required: true },
  created_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true },
});

const EventModel = mongoose.model<EventNoteDoc>("Event", eventSchema);

export default EventModel;


