import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "./user.interface";
import UserModel from "./user.model";
import config from "../../app/config";

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
    { expiresIn: "1h" }
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
export const userService = {
  signUp,
  login,
};
