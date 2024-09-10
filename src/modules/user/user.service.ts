import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "./user.interface";
import UserModel from "./user.model";
import config from "../../app/config";
// Get all users (admin only)
const getAllUsers = async (): Promise<Omit<IUser, "password">[]> => {
  const users = await UserModel.find().select("-password");
  return users.map((user) => user.toObject({ versionKey: false }));
};

// Update user role
const updateUserRole = async (
  userId: string,
  newRole: "admin" | "user"
): Promise<Omit<IUser, "password">> => {
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { role: newRole },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new Error("User not found or role update failed");
  }

  return user.toObject({ versionKey: false });
};

const signUp = async (userData: IUser): Promise<Omit<IUser, "password">> => {
  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Create a new user with the hashed password
  const newUser = new UserModel({ ...userData, password: hashedPassword });
  await newUser.save();

  // Convert the Mongoose document to a plain JavaScript object
  const { password, ...userObject } = newUser.toObject({
    versionKey: false, // Exclude the __v field
  });

  return userObject as Omit<IUser, "password">;
};

const login = async (loginData: { email: string; password: string }) => {
  // Find the user by email
  const user = await UserModel.findOne({ email: loginData.email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Check if the password matches
  const isMatch = await bcrypt.compare(loginData.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    config.jwt_access_secret as string,
    { expiresIn: "1d" }
  );

  // Convert Mongoose document to a plain JavaScript object and remove password
  const { password, ...userObject } = user.toObject({
    versionKey: false, // Exclude the __v field
  });

  return {
    token,
    userObject,
  };
};

// Get user profile by ID
const getProfile = async (userId: string): Promise<Omit<IUser, "password">> => {
  const user = await UserModel.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user.toObject({ versionKey: false });
};
const updateProfile = async (
  userId: string,
  updatedData: Partial<IUser>
): Promise<Omit<IUser, "password">> => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) {
    throw new Error("User not found or update failed");
  }

  return updatedUser.toObject({ versionKey: false });
};
export const userService = {
  signUp,
  login,
  getProfile,
  updateProfile,
  getAllUsers,
  updateUserRole,
};
