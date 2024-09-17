import mongoose from "mongoose";

interface Status {
  _id?: mongoose.Types.ObjectId | null;
  name: string;
}

export default Status;
