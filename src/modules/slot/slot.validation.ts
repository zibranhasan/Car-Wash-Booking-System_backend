// src/validations/ServiceSlot.validation.ts

import { z } from "zod";

export const createServiceSlotSchema = z.object({
  service: z.string().nonempty({ message: "Service ID is required" }),
  date: z.string().nonempty({ message: "Date is required" }),
  startTime: z.string().nonempty({ message: "Start time is required" }),
  endTime: z.string().nonempty({ message: "End time is required" }),
});

export const getAvailableSlotsSchema = z.object({
  date: z.string().optional(),
  serviceId: z.string().optional(),
});
// New: Update slot validation
export const updateServiceSlotSchema = z.object({
  service: z.string().optional(),
  date: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  isBooked: z.enum(["available", "booked", "canceled"]).optional(),
});
