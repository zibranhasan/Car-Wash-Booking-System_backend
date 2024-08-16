// src/interfaces/IBooking.ts

export interface IBooking {
  _id?: string;
  customer?: string; // Reference to User ID
  service?: string; // Reference to Service ID
  slot?: string; // Reference to ServiceSlot ID
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  createdAt?: Date;
  updatedAt?: Date;
}
