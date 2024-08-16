// src/controllers/service.controller.ts
import { Request, Response } from "express";

import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import { createServiceSchema, updateServiceSchema } from "./service.validation";
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "./service.service";

export const createServiceController = catchAsync(
  async (req: Request, res: Response) => {
    const validatedBody = createServiceSchema.parse(req.body);
    const service = await createService(validatedBody);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service created successfully",
      data: service,
    });
  }
);

export const getServiceController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const service = await getServiceById(id);

    if (!service) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "Service not found",
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service retrieved successfully",
      data: service,
    });
  }
);

export const getAllServicesController = catchAsync(
  async (_req: Request, res: Response) => {
    const services = await getAllServices();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Services retrieved successfully",
      data: services,
    });
  }
);

export const updateServiceController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedBody = updateServiceSchema.parse(req.body);
    const service = await updateService(id, validatedBody);

    if (!service) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "Service not found",
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service updated successfully",
      data: service,
    });
  }
);

export const deleteServiceController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const service = await deleteService(id);

    if (!service) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "Service not found",
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service deleted successfully",
      data: service,
    });
  }
);
