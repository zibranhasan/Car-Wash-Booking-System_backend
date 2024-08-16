// src/routes/Booking.route.ts

import express from "express";
import auth, { USER_ROLE } from "../../app/middlewares/auth";
import {
  createBookingController,
  getAllBookingsController,
  getUserBookingsController,
} from "./booking.controller";

const router = express.Router();

router.post("/bookings", auth(USER_ROLE.user), createBookingController);
router.get("/bookings", auth(USER_ROLE.admin), getAllBookingsController);
router.get("/my-bookings", auth(USER_ROLE.user), getUserBookingsController);

export const BookingRoutes = router;
