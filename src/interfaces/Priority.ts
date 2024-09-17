import mongoose from "mongoose";

interface Priority {
  _id?: mongoose.Types.ObjectId | null;
  color_id: mongoose.Types.ObjectId;
  name: string;
}

export default Priority;
