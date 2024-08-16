// src/validations/Booking.validation.ts

import { z } from "zod";

export const createBookingSchema = z.object({
  serviceId: z.string().nonempty(),
  slotId: z.string().nonempty(),
  vehicleType: z.string().nonempty(),
  vehicleBrand: z.string().nonempty(),
  vehicleModel: z.string().nonempty(),
  manufacturingYear: z.number().int().min(1886), // The year the first car was made
  registrationPlate: z.string().nonempty(),
});
