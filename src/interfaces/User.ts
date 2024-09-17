import mongoose from "mongoose";

interface User extends Document {
    _id?: mongoose.Types.ObjectId | null;
    name?: string;
    surname?: string;
    username: string;
    phone?: string|null;
    profileImg?: string|null;
    email: string;
    password: string;
    role_id: mongoose.Types.ObjectId;
    created_at: Date;
    is_active: boolean;
}

export default User;
