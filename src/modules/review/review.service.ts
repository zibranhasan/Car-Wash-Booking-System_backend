// src/modules/reviews/review.service.ts
import Review from "./review.model";
import { IReview } from "./review.interface";

class ReviewService {
  // Create a new review
  public async createReview(reviewData: IReview): Promise<IReview> {
    const newReview = new Review(reviewData);
    return newReview.save();
  }

  // Get all reviews
  public async getAllReviews(): Promise<IReview[]> {
    return Review.find().populate("userId", "name email");
  }
}

export const reviewService = new ReviewService();
