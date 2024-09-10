// src/modules/reviews/review.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { reviewService } from "./review.service";
import sendResponse from "../../app/utils/sendResponse";

// Create a new review
const createReview = catchAsync(async (req: Request, res: Response) => {
  const { feedback, rating } = req.body;
  const userId = req.user.id;

  if (rating < 1 || rating > 5) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Rating should be between 1 and 5 stars.",
      data: [],
    });
  }

  const newReview = await reviewService.createReview({
    userId,
    feedback,
    rating,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review created successfully!",
    data: newReview,
  });
});

// Get all reviews
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const reviews = await reviewService.getAllReviews();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All reviews retrieved successfully",
    data: reviews,
  });
});

export const reviewController = {
  createReview,
  getAllReviews,
};
