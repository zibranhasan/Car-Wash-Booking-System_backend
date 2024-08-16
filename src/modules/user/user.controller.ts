import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../app/utils/sendResponse";

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

export const userController = {
  createUser,
  loginController,
};
