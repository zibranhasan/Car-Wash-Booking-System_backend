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
exports.reviewController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const review_service_1 = require("./review.service");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
// Create a new review
const createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { feedback, rating } = req.body;
    const userId = req.user.id;
    if (rating < 1 || rating > 5) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Rating should be between 1 and 5 stars.",
            data: [],
        });
    }
    const newReview = yield review_service_1.reviewService.createReview({
        userId,
        feedback,
        rating,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Review created successfully!",
        data: newReview,
    });
}));
// Get all reviews
const getAllReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_service_1.reviewService.getAllReviews();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All reviews retrieved successfully",
        data: reviews,
    });
}));
exports.reviewController = {
    createReview,
    getAllReviews,
};
