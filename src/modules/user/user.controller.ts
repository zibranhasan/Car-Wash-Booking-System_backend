import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../app/utils/sendResponse";
// Get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users retrieved successfully",
    data: users,
  });
});

// Update user role
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { role } = req.body;

  const updatedUser = await userService.updateUserRole(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully",
    data: updatedUser,
  });
});
const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const result = await userService.signUp(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginController = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Perform login using the service
  const result = await userService.login({ email, password });

  // Send the response with the required structure
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: result.token,
    data: result.userObject,
  });
});

const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const userProfile = await userService.getProfile(userId);
    return res.status(200).json({ user: userProfile });
  } catch (error) {
    const err = error as Error; // Cast to Error type
    return res.status(404).json({ error: err.message });
  }
};
// Update Profile
const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const updatedUser = await userService.updateProfile(userId, req.body);
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    const err = error as Error; // Cast to Error type
    return res.status(404).json({ error: err.message });
  }
};
export const userController = {
  createUser,
  loginController,
  getProfile,
  updateProfile,
  getAllUsers,
  updateUserRole,
};
