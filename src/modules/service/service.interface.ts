// src/interfaces/service.interface.ts
export interface IService {
  name: string;
  description: string;
  photo?: string;
  price: number;
  duration: number;
  reviews?: number[];
  isDeleted?: boolean;
  createdAt?: Date; // Optional
  updatedAt?: Date; // Optional
}
