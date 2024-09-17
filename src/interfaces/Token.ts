import mongoose from "mongoose";

export default interface TokenByRole {
  _id: mongoose.Types.ObjectId;
  role_id: mongoose.Types.ObjectId;
}
