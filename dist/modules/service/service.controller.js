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
exports.deleteServiceController = exports.updateServiceController = exports.getAllServicesController = exports.getServiceController = exports.createServiceController = void 0;
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const service_validation_1 = require("./service.validation");
const service_service_1 = require("./service.service");
exports.createServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedBody = service_validation_1.createServiceSchema.parse(req.body);
    const service = yield (0, service_service_1.createService)(validatedBody);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Service created successfully",
        data: service,
    });
}));
exports.getServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const service = yield (0, service_service_1.getServiceById)(id);
    if (!service) {
        return res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "Service not found",
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Service retrieved successfully",
        data: service,
    });
}));
exports.getAllServicesController = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield (0, service_service_1.getAllServices)();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Services retrieved successfully",
        data: services,
    });
}));
exports.updateServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const validatedBody = service_validation_1.updateServiceSchema.parse(req.body);
    const service = yield (0, service_service_1.updateService)(id, validatedBody);
    if (!service) {
        return res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "Service not found",
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Service updated successfully",
        data: service,
    });
}));
exports.deleteServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const service = yield (0, service_service_1.deleteService)(id);
    if (!service) {
        return res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "Service not found",
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Service deleted successfully",
        data: service,
    });
}));
