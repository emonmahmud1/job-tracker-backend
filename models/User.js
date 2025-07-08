import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    resume: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;

