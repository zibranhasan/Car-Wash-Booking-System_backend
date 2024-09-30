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
exports.reviewService = void 0;
// src/modules/reviews/review.service.ts
const review_model_1 = __importDefault(require("./review.model"));
class ReviewService {
    // Create a new review
    createReview(reviewData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReview = new review_model_1.default(reviewData);
            return newReview.save();
        });
    }
    // Get all reviews
    getAllReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            return review_model_1.default.find().populate("userId", "name email");
        });
    }
}
exports.reviewService = new ReviewService();
