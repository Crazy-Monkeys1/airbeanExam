import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    role: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
