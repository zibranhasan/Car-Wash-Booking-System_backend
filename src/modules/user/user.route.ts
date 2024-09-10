import express from "express";
import { userController } from "./user.controller";
import auth, { USER_ROLE } from "../../app/middlewares/auth";

const router = express.Router();

router.post("/auth/signup", userController.createUser);
router.post("/auth/login", userController.loginController);
// Profile routes
router.get(
  "/profile",
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.getProfile
); // Get profile
router.put(
  "/profile",
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.updateProfile
); // Update profile

// Get all users (admin only)
router.get("/allUser", auth(USER_ROLE.admin), userController.getAllUsers); // Get all users

// Update user role (admin only)
router.put(
  "/userRole/:userId",
  auth(USER_ROLE.admin),
  userController.updateUserRole
); // Update user role

export const UserRoutes = router;
