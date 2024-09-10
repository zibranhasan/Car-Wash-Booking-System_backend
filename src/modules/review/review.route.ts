// src/modules/reviews/review.route.ts
import express from "express";
import { reviewController } from "./review.controller";
import auth, { USER_ROLE } from "../../app/middlewares/auth";

const router = express.Router();

// POST /reviews - Create a new review
router.post(
  "/reviews",
  auth(USER_ROLE.admin, USER_ROLE.user),
  reviewController.createReview
);

// GET /reviews - Get all reviews
router.get("/reviews", reviewController.getAllReviews);

export const ReviewRoutes = router;
