"use strict";
// src/validations/Booking.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingSchema = void 0;
const zod_1 = require("zod");
exports.createBookingSchema = zod_1.z.object({
    serviceId: zod_1.z.string().nonempty(),
    slotId: zod_1.z.string().nonempty(),
    vehicleType: zod_1.z.string().nonempty(),
    vehicleBrand: zod_1.z.string().nonempty(),
    vehicleModel: zod_1.z.string().nonempty(),
    manufacturingYear: zod_1.z.number().int().min(1886), // The year the first car was made
    registrationPlate: zod_1.z.string().nonempty(),
});
