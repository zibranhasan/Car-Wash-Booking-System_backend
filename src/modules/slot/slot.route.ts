// src/routes/ServiceSlot.route.ts

import express from "express";

import {
  createServiceSlotController,
  getAvailableSlotsController,
} from "./slot.controller";
import auth, { USER_ROLE } from "../../app/middlewares/auth";

const router = express.Router();

router.post(
  "/services/slots",
  auth(USER_ROLE.admin),
  createServiceSlotController
);
router.get("/slots/availability", getAvailableSlotsController);

export const SlotRoutes = router;
