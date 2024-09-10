// src/routes/ServiceSlot.route.ts

import express from "express";

import {
  createServiceSlotController,
  deleteServiceSlotController,
  getAllSlotsController,
  getAvailableSlotsController,
  updateServiceSlotController,
} from "./slot.controller";
import auth, { USER_ROLE } from "../../app/middlewares/auth";

const router = express.Router();

// New routes for fetching all slots and updating a slot
router.get("/servicess/slots", auth(USER_ROLE.admin), getAllSlotsController); // Get all slots

router.post(
  "/services/slots",
  auth(USER_ROLE.admin),
  createServiceSlotController
);
router.get("/slots/availability", getAvailableSlotsController);

router.put(
  "/services/slots/:id",
  auth(USER_ROLE.admin),
  updateServiceSlotController
); // Update a slot
router.delete("/slots/:id", deleteServiceSlotController); // Delete slot
export const SlotRoutes = router;
