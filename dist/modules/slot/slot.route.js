"use strict";
// src/routes/ServiceSlot.route.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const slot_controller_1 = require("./slot.controller");
const auth_1 = __importStar(require("../../app/middlewares/auth"));
const router = express_1.default.Router();
// New routes for fetching all slots and updating a slot
router.get("/servicess/slots", (0, auth_1.default)(auth_1.USER_ROLE.admin), slot_controller_1.getAllSlotsController); // Get all slots
router.post("/services/slots", (0, auth_1.default)(auth_1.USER_ROLE.admin), slot_controller_1.createServiceSlotController);
router.get("/slots/availability", slot_controller_1.getAvailableSlotsController);
router.put("/services/slots/:id", (0, auth_1.default)(auth_1.USER_ROLE.admin), slot_controller_1.updateServiceSlotController); // Update a slot
router.delete("/slots/:id", slot_controller_1.deleteServiceSlotController); // Delete slot
exports.SlotRoutes = router;
