// src/validations/service.validation.ts
import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  duration: z.number().positive(),
  isDeleted: z.boolean().optional(),
});

export const updateServiceSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  isDeleted: z.boolean().optional(),
});
