import mongoose from "mongoose";

interface Reminder {
  _id?: mongoose.Types.ObjectId | null;
  event_id: mongoose.Types.ObjectId;
  message: string;
}

export default Reminder;
