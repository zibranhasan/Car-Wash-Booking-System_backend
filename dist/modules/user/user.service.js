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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("./user.model"));
const config_1 = __importDefault(require("../../app/config"));
// Get all users (admin only)
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find().select("-password");
    return users.map((user) => user.toObject({ versionKey: false }));
});
// Update user role
const updateUserRole = (userId, newRole) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(userId, { role: newRole }, { new: true, runValidators: true }).select("-password");
    if (!user) {
        throw new Error("User not found or role update failed");
    }
    return user.toObject({ versionKey: false });
});
const signUp = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.default.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    // Hash the password
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
    // Create a new user with the hashed password
    const newUser = new user_model_1.default(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
    yield newUser.save();
    // Convert the Mongoose document to a plain JavaScript object
    const _a = newUser.toObject({
        versionKey: false, // Exclude the __v field
    }), { password } = _a, userObject = __rest(_a, ["password"]);
    return userObject;
});
const login = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the user by email
    const user = yield user_model_1.default.findOne({ email: loginData.email });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    // Check if the password matches
    const isMatch = yield bcrypt_1.default.compare(loginData.password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, config_1.default.jwt_access_secret, { expiresIn: "1d" });
    // Convert Mongoose document to a plain JavaScript object and remove password
    const _a = user.toObject({
        versionKey: false, // Exclude the __v field
    }), { password } = _a, userObject = __rest(_a, ["password"]);
    return {
        token,
        userObject,
    };
});
// Get user profile by ID
const getProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId).select("-password");
    if (!user) {
        throw new Error("User not found");
    }
    return user.toObject({ versionKey: false });
});
const updateProfile = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, updatedData, {
        new: true,
        runValidators: true,
    }).select("-password");
    if (!updatedUser) {
        throw new Error("User not found or update failed");
    }
    return updatedUser.toObject({ versionKey: false });
});
exports.userService = {
    signUp,
    login,
    getProfile,
    updateProfile,
    getAllUsers,
    updateUserRole,
};
