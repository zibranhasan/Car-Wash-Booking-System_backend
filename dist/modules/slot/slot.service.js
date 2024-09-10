"use strict";
// src/services/ServiceSlot.service.ts
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
exports.getAvailableSlots = exports.createSlots = void 0;
const slot_model_1 = require("./slot.model");
const createSlots = (slotData) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, startTime, endTime, service } = slotData;
    const startMinutes = parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
    const endMinutes = parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);
    const slots = [];
    const serviceDuration = 60; // Assuming 60 minutes per slot
    for (let i = startMinutes; i < endMinutes; i += serviceDuration) {
        const slotStartTime = `${Math.floor(i / 60)
            .toString()
            .padStart(2, "0")}:${(i % 60).toString().padStart(2, "0")}`;
        const slotEndTime = `${Math.floor((i + serviceDuration) / 60)
            .toString()
            .padStart(2, "0")}:${((i + serviceDuration) % 60)
            .toString()
            .padStart(2, "0")}`;
        const slot = yield slot_model_1.ServiceSlot.create({
            service,
            date,
            startTime: slotStartTime,
            endTime: slotEndTime,
        });
        slots.push(slot);
    }
    return slots;
});
exports.createSlots = createSlots;
const getAvailableSlots = (date, serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (date)
        query.date = date;
    if (serviceId)
        query.service = serviceId;
    const availableSlots = yield slot_model_1.ServiceSlot.find(query)
        .populate("service") // Populate service details if needed
        .exec();
    return availableSlots;
});
exports.getAvailableSlots = getAvailableSlots;
