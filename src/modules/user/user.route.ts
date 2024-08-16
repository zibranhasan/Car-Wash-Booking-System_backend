import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/auth/signup", userController.createUser);
router.post("/auth/login", userController.loginController);

export const UserRoutes = router;
