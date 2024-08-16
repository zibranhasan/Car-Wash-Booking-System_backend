// src/controllers/ServiceSlot.controller.ts

import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import {
  createServiceSlotSchema,
  getAvailableSlotsSchema,
} from "./slot.validation";
import { createSlots, getAvailableSlots } from "./slot.service";

export const createServiceSlotController = catchAsync(
  async (req: Request, res: Response) => {
    const validatedBody = createServiceSlotSchema.parse(req.body);
    const slots = await createSlots(validatedBody);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Slots created successfully",
      data: slots,
    });
  }
);
export const getAvailableSlotsController = catchAsync(
  async (req: Request, res: Response) => {
    const { date, serviceId } = getAvailableSlotsSchema.parse(req.query);
    const slots = await getAvailableSlots(date, serviceId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Available slots retrieved successfully",
      data: slots,
    });
  }
);
