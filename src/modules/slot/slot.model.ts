// src/models/ServiceSlot.model.ts

import mongoose, { Schema } from "mongoose";
import { IServiceSlot } from "./slot.interface";

const serviceSlotSchema = new Schema<IServiceSlot>(
  {
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: {
      type: String,
      enum: ["available", "booked", "canceled"],
      default: "available",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const ServiceSlot = mongoose.model<IServiceSlot>(
  "ServiceSlot",
  serviceSlotSchema
);
