import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        profileImage: { type: String },
        provider: { type: String, default: "credentials" },
        theme: { type: String, default: "light" },
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
