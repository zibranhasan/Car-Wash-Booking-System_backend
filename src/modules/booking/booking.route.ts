// src/routes/Booking.route.ts

import express from "express";
import auth, { USER_ROLE } from "../../app/middlewares/auth";
import {
  createBookingController,
  deleteBookingController,
  getAllBookingsController,
  getUserBookingsController,
} from "./booking.controller";

const router = express.Router();

router.post("/bookings", auth(USER_ROLE.user), createBookingController);
// router.post("/bookings", createBookingController);
router.get(
  "/bookings",
  auth(USER_ROLE.admin, USER_ROLE.user),
  getAllBookingsController
);
router.get(
  "/my-bookings",
  auth(USER_ROLE.user, USER_ROLE.admin),
  getUserBookingsController
);

router.delete("/bookings/:id", auth(USER_ROLE.user), deleteBookingController); // Add the delete route

export const BookingRoutes = router;
