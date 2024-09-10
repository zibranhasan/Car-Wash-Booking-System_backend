// src/controllers/Booking.controller.ts

import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { createBookingSchema } from "./booking.validation";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getUserBookings,
} from "./booking.service";
import sendResponse from "../../app/utils/sendResponse";

export const createBookingController = catchAsync(
  async (req: Request, res: Response) => {
    const bookingData = createBookingSchema.parse(req.body);
    const userId = req.user.id; // Assuming user info is added to the request by middleware
    // console.log("hi from controller", { ...bookingData, customer: userId });
    const booking = await createBooking({
      vehicleType: bookingData.vehicleType,
      vehicleBrand: bookingData.vehicleBrand,
      vehicleModel: bookingData.vehicleModel,
      manufacturingYear: bookingData.manufacturingYear,
      registrationPlate: bookingData.registrationPlate,
      service: bookingData.serviceId,
      slot: bookingData?.slotId,
      customer: userId,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking successful",
      data: booking,
    });
  }
);

export const getAllBookingsController = catchAsync(
  async (req: Request, res: Response) => {
    const bookings = await getAllBookings();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All bookings retrieved successfully",
      data: bookings,
    });
  }
);

export const getUserBookingsController = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id; // Assuming user info is added to the request by middleware
    const bookings = await getUserBookings(userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User bookings retrieved successfully",
      data: bookings,
    });
  }
);

export const deleteBookingController = catchAsync(
  async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    await deleteBooking(bookingId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking deleted successfully",
      data: [],
    });
  }
);
