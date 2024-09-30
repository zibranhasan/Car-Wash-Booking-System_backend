"use strict";
// src/controllers/Booking.controller.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingController = exports.getUserBookingsController = exports.getAllBookingsController = exports.createBookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const booking_validation_1 = require("./booking.validation");
const booking_service_1 = require("./booking.service");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
exports.createBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = booking_validation_1.createBookingSchema.parse(req.body);
    const userId = req.user.id; // Assuming user info is added to the request by middleware
    // console.log("hi from controller", { ...bookingData, customer: userId });
    const booking = yield (0, booking_service_1.createBooking)({
        vehicleType: bookingData.vehicleType,
        vehicleBrand: bookingData.vehicleBrand,
        vehicleModel: bookingData.vehicleModel,
        manufacturingYear: bookingData.manufacturingYear,
        registrationPlate: bookingData.registrationPlate,
        service: bookingData.serviceId,
        slot: bookingData === null || bookingData === void 0 ? void 0 : bookingData.slotId,
        customer: userId,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Booking successful",
        data: booking,
    });
}));
exports.getAllBookingsController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield (0, booking_service_1.getAllBookings)();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All bookings retrieved successfully",
        data: bookings,
    });
}));
exports.getUserBookingsController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id; // Assuming user info is added to the request by middleware
    const bookings = yield (0, booking_service_1.getUserBookings)(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User bookings retrieved successfully",
        data: bookings,
    });
}));
exports.deleteBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = req.params.id;
    yield (0, booking_service_1.deleteBooking)(bookingId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Booking deleted successfully",
        data: [],
    });
}));
