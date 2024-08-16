// src/routes/service.route.ts
import express from "express";
import {
  createServiceController,
  deleteServiceController,
  getAllServicesController,
  getServiceController,
  updateServiceController,
} from "./service.controller";
import auth, { USER_ROLE } from "../../app/middlewares/auth";

const router = express.Router();

router.post("/services", auth(USER_ROLE.admin), createServiceController);
router.get("/services/:id", getServiceController);
router.get("/services", getAllServicesController);
router.put("/services/:id", auth(USER_ROLE.admin), updateServiceController);
router.delete("/services/:id", auth(USER_ROLE.admin), deleteServiceController);

export const ServiceRoutes = router;
