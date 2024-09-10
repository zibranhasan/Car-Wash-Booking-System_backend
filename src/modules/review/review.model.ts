// src/modules/reviews/review.model.ts
import mongoose, { Schema, Document } from "mongoose";
import { IReview } from "./review.interface";

export interface IReviewModel extends IReview, Document {}

const reviewSchema = new Schema<IReviewModel>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model<IReviewModel>("Review", reviewSchema);

export default Review;
