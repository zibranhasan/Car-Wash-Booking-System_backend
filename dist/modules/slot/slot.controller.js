"use strict";
// src/controllers/ServiceSlot.controller.ts
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
exports.deleteServiceSlotController = exports.updateServiceSlotController = exports.getAllSlotsController = exports.getAvailableSlotsController = exports.createServiceSlotController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const slot_validation_1 = require("./slot.validation");
const slot_service_1 = require("./slot.service");
exports.createServiceSlotController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedBody = slot_validation_1.createServiceSlotSchema.parse(req.body);
    const slots = yield (0, slot_service_1.createSlots)(validatedBody);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Slots created successfully",
        data: slots,
    });
}));
exports.getAvailableSlotsController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, serviceId } = slot_validation_1.getAvailableSlotsSchema.parse(req.query);
    const slots = yield (0, slot_service_1.getAvailableSlots)(date, serviceId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Available slots retrieved successfully",
        data: slots,
    });
}));
// New: Get all slots
exports.getAllSlotsController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slots = yield (0, slot_service_1.getAllSlots)();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All slots retrieved successfully",
        data: slots,
    });
}));
// // New: Update slot
exports.updateServiceSlotController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedBody = slot_validation_1.updateServiceSlotSchema.parse(req.body);
    const updatedSlot = yield (0, slot_service_1.updateServiceSlot)(req.params.id, validatedBody);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Slot updated successfully",
        data: updatedSlot,
    });
}));
// New: Delete slot
exports.deleteServiceSlotController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, slot_service_1.deleteServiceSlot)(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.NO_CONTENT,
        message: "Slot deleted successfully",
        data: [],
    });
}));
