// src/models/Booking.model.ts

import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    slot: { type: Schema.Types.ObjectId, ref: "ServiceSlot", required: true },
    vehicleType: { type: String, required: true },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: String, required: true },
    registrationPlate: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
