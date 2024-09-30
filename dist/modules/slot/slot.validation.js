"use strict";
// src/validations/ServiceSlot.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceSlotSchema = exports.getAvailableSlotsSchema = exports.createServiceSlotSchema = void 0;
const zod_1 = require("zod");
exports.createServiceSlotSchema = zod_1.z.object({
    service: zod_1.z.string().nonempty({ message: "Service ID is required" }),
    date: zod_1.z.string().nonempty({ message: "Date is required" }),
    startTime: zod_1.z.string().nonempty({ message: "Start time is required" }),
    endTime: zod_1.z.string().nonempty({ message: "End time is required" }),
});
exports.getAvailableSlotsSchema = zod_1.z.object({
    date: zod_1.z.string().optional(),
    serviceId: zod_1.z.string().optional(),
});
// New: Update slot validation
exports.updateServiceSlotSchema = zod_1.z.object({
    service: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    startTime: zod_1.z.string().optional(),
    endTime: zod_1.z.string().optional(),
    isBooked: zod_1.z.enum(["available", "booked", "canceled"]).optional(),
});
