"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
// Get all users
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.userService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All users retrieved successfully",
        data: users,
    });
}));
// Update user role
const updateUserRole = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { role } = req.body;
    const updatedUser = yield user_service_1.userService.updateUserRole(userId, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User role updated successfully",
        data: updatedUser,
    });
}));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield user_service_1.userService.signUp(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User registered successfully",
        data: result,
    });
}));
const loginController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Perform login using the service
    const result = yield user_service_1.userService.login({ email, password });
    // Send the response with the required structure
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged in successfully",
        token: result.token,
        data: result.userObject,
    });
}));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const userProfile = yield user_service_1.userService.getProfile(userId);
        return res.status(200).json({ user: userProfile });
    }
    catch (error) {
        const err = error; // Cast to Error type
        return res.status(404).json({ error: err.message });
    }
});
// Update Profile
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const updatedUser = yield user_service_1.userService.updateProfile(userId, req.body);
        return res.status(200).json({ user: updatedUser });
    }
    catch (error) {
        const err = error; // Cast to Error type
        return res.status(404).json({ error: err.message });
    }
});
exports.userController = {
    createUser,
    loginController,
    getProfile,
    updateProfile,
    getAllUsers,
    updateUserRole,
};
