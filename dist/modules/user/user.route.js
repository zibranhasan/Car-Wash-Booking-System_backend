"use strict";
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
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importStar(require("../../app/middlewares/auth"));
const router = express_1.default.Router();
router.post("/auth/signup", user_controller_1.userController.createUser);
router.post("/auth/login", user_controller_1.userController.loginController);
// Profile routes
router.get("/profile", (0, auth_1.default)(auth_1.USER_ROLE.admin, auth_1.USER_ROLE.user), user_controller_1.userController.getProfile); // Get profile
router.put("/profile", (0, auth_1.default)(auth_1.USER_ROLE.admin, auth_1.USER_ROLE.user), user_controller_1.userController.updateProfile); // Update profile
// Get all users (admin only)
router.get("/allUser", (0, auth_1.default)(auth_1.USER_ROLE.admin), user_controller_1.userController.getAllUsers); // Get all users
// Update user role (admin only)
router.put("/userRole/:userId", (0, auth_1.default)(auth_1.USER_ROLE.admin), user_controller_1.userController.updateUserRole); // Update user role
exports.UserRoutes = router;
