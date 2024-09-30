"use strict";
// src/services/Booking.service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.getUserBookings = exports.getAllBookings = exports.createBooking = void 0;
const booking_model_1 = require("./booking.model");
const createBooking = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new booking
    const booking = new booking_model_1.Booking(bookingData);
    yield booking.save();
    // Populate the necessary fields
    const populatedBooking = yield booking_model_1.Booking.findById(booking._id)
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
});
exports.createBooking = createBooking;
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_model_1.Booking.find().populate("customer service slot").exec();
});
exports.getAllBookings = getAllBookings;
const getUserBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_model_1.Booking.find({ customer: userId })
        .populate("service slot")
        .exec();
});
exports.getUserBookings = getUserBookings;
const deleteBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    yield booking_model_1.Booking.findByIdAndDelete(bookingId); // Delete the booking by ID
});
exports.deleteBooking = deleteBooking;
