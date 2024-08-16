// src/interfaces/service.interface.ts
export interface IService {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted?: boolean;
  createdAt?: Date; // Optional
  updatedAt?: Date; // Optional
}
