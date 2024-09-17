import mongoose, { Schema, Document } from "mongoose";
import { Role } from "../interfaces";

interface RoleDoc extends Role, Document {}

const RoleSchema = new Schema({
  name: { type: String, required: true },
});

const RoleModel = mongoose.model<RoleDoc>("Role", RoleSchema);

export default RoleModel;
