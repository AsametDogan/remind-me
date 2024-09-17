import mongoose, { Schema, Document } from "mongoose";
import { User } from "../interfaces";

interface UserDoc extends User {}

const UserSchema: Schema<UserDoc> = new Schema({
  name: { type: String, required: false },
  surname: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: false, default: null, unique: true },
  profileImg: { type: String, required: false, default: null },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role_id: { type: Schema.Types.ObjectId, ref: "Role", required: true ,default:"66087fb7a4641f2df9321e9b" },
  created_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true },
});

const UserModel = mongoose.model<UserDoc>("User", UserSchema);

export default UserModel;
