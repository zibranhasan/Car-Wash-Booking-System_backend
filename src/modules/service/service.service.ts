// src/services/service.service.ts

import { IService } from "./service.interface";
import ServiceModel from "./service.model";

export const createService = async (
  data: Omit<IService, "createdAt" | "updatedAt">
) => {
  const service = new ServiceModel(data);
  await service.save();
  return service.toObject({ versionKey: false });
};
export const getServiceById = async (id: string) => {
  return await ServiceModel.findById(id).lean({ versionKey: false });
};

export const getAllServices = async () => {
  return await ServiceModel.find({ isDeleted: false }).lean({
    versionKey: false,
  });
};

export const updateService = async (id: string, data: Partial<IService>) => {
  const service = await ServiceModel.findByIdAndUpdate(id, data, {
    new: true,
  }).lean({ versionKey: false });
  return service;
};

export const deleteService = async (id: string) => {
  const service = await ServiceModel.findById(id);
  if (service) {
    service.isDeleted = true;
    await service.save();
    return service.toObject({ versionKey: false });
  }
  return null;
};
export const addReviewToService = async (id: string, rating: number) => {
  const service = await ServiceModel.findById(id);
  if (!service) {
    throw new Error("Service not found");
  }

  // Add the review rating to the array
  service?.reviews?.push(rating);
  await service.save();

  return service.toObject({ versionKey: false });
};
