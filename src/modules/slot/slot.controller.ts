// src/controllers/ServiceSlot.controller.ts

import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import {
  createServiceSlotSchema,
  getAvailableSlotsSchema,
  updateServiceSlotSchema,
} from "./slot.validation";
import {
  createSlots,
  deleteServiceSlot,
  getAllSlots,
  getAvailableSlots,
  updateServiceSlot,
} from "./slot.service";

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
// New: Get all slots
export const getAllSlotsController = catchAsync(
  async (req: Request, res: Response) => {
    const slots = await getAllSlots();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All slots retrieved successfully",
      data: slots,
    });
  }
);

// // New: Update slot
export const updateServiceSlotController = catchAsync(
  async (req: Request, res: Response) => {
    const validatedBody = updateServiceSlotSchema.parse(req.body);
    const updatedSlot = await updateServiceSlot(req.params.id, validatedBody);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Slot updated successfully",
      data: updatedSlot,
    });
  }
);

// New: Delete slot
export const deleteServiceSlotController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteServiceSlot(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.NO_CONTENT,
      message: "Slot deleted successfully",
      data: [],
    });
  }
);
