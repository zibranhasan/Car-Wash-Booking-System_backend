// src/services/ServiceSlot.service.ts

import { IServiceSlot } from "./slot.interface";
import { ServiceSlot } from "./slot.model";

export const createSlots = async (slotData: IServiceSlot) => {
  const { date, startTime, endTime, service } = slotData;

  const startMinutes =
    parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
  const endMinutes =
    parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);

  const slots: IServiceSlot[] = [];
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

    const slot = await ServiceSlot.create({
      service,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
    });

    slots.push(slot);
  }

  return slots;
};
export const getAvailableSlots = async (date?: string, serviceId?: string) => {
  const query: Partial<IServiceSlot> = {};

  if (date) query.date = date;
  if (serviceId) query.service = serviceId;

  const availableSlots = await ServiceSlot.find(query)
    .populate("service") // Populate service details if needed
    .exec();

  return availableSlots;
};
