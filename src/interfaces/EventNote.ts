import mongoose from "mongoose";

interface EventNote {
  _id?: mongoose.Types.ObjectId | null;
  user_id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  start_time: Date;
  end_time: Date;
  priority_id: mongoose.Types.ObjectId;
  status_id: mongoose.Types.ObjectId;
  recur_type_id: mongoose.Types.ObjectId;
  category_id: mongoose.Types.ObjectId;
  color_id: mongoose.Types.ObjectId;
  created_at: Date;
  is_active: boolean;
}

export default EventNote;
