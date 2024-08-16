// src/interfaces/IServiceSlot.ts

export interface IServiceSlot {
  _id?: string;
  service?: string; // Reference to Service ID
  date: string; // ISO Date string
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  isBooked?: string; // available | booked | canceled
  createdAt?: Date;
  updatedAt?: Date;
}
