// src/services/Booking.service.ts

import { Booking } from "./booking.model";

export const createBooking = async (bookingData: any) => {
  // Create a new booking
  const booking = new Booking(bookingData);
  await booking.save();

  // Populate the necessary fields
  const populatedBooking = await Booking.findById(booking._id)
    .populate({
      path: "customer",
      select: "_id name email phone address",
    })
    .populate({
      path: "service",
      select: "_id name description price duration isDeleted",
    })
    .populate({
      path: "slot",
      select: "_id service date startTime endTime isBooked",
    })
    .exec();

  return populatedBooking;
};

export const getAllBookings = async () => {
  return await Booking.find().populate("customer service slot").exec();
};

export const getUserBookings = async (userId: string) => {
  return await Booking.find({ customer: userId })
    .populate("service slot")
    .exec();
};
export const deleteBooking = async (bookingId: string) => {
  await Booking.findByIdAndDelete(bookingId); // Delete the booking by ID
};
