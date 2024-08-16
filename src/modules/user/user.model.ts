import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser as IUserInterface } from "./user.interface";

// Extend IUserInterface with Mongoose's Document interface
export interface IUser extends IUserInterface, Document {}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

// Create and export the User model
const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
