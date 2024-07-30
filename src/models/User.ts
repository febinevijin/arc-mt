import mongoose from "mongoose";
import { userRole } from "../utils/enum.js";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: {
        values: Object.values(userRole),
        message: "Please provide valid role",
      },
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
UserSchema.index({ email: 1 });
const User = mongoose.model("user", UserSchema);
export default User;
