// src/modules/reviews/review.interface.ts
export interface IReview {
  userId?: string;
  feedback: string;
  rating: number;
  createdAt?: Date;
}
