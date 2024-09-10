"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const config_1 = __importDefault(require("../config"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else {
        // Handle specific error types
        if ((err === null || err === void 0 ? void 0 : err.name) === "Validation") {
            const simplifiedError = (0, handleValidationError_1.default)(err);
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorDetails.errorSources;
        }
        else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
            const simplifiedError = (0, handleCastError_1.default)(err);
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorDetails.errorSources;
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
            const simplifiedError = (0, handleDuplicateError_1.default)(err);
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorDetails.errorSources;
        }
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage: (err === null || err === void 0 ? void 0 : err.message) || "An error occurred",
        errorDetails: err,
        errorSources,
        stack: config_1.default.NODE_ENV === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
