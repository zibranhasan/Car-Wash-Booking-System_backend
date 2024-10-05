"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceSchema = exports.createServiceSchema = void 0;
// src/validations/service.validation.ts
const zod_1 = require("zod");
exports.createServiceSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    photo: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    duration: zod_1.z.number().positive(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.updateServiceSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    photo: zod_1.z.string().optional(),
    price: zod_1.z.number().positive().optional(),
    duration: zod_1.z.number().positive().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
