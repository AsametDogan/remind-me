import mongoose from "mongoose";

interface RecurType {
  _id?: mongoose.Types.ObjectId | null;
  name: string;
}

export default RecurType;
