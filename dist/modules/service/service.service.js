"use strict";
// src/services/service.service.ts
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
exports.addReviewToService = exports.deleteService = exports.updateService = exports.getAllServices = exports.getServiceById = exports.createService = void 0;
const service_model_1 = __importDefault(require("./service.model"));
const createService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const service = new service_model_1.default(data);
    yield service.save();
    return service.toObject({ versionKey: false });
});
exports.createService = createService;
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service_model_1.default.findById(id).lean({ versionKey: false });
});
exports.getServiceById = getServiceById;
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield service_model_1.default.find({ isDeleted: false }).lean({
        versionKey: false,
    });
});
exports.getAllServices = getAllServices;
const updateService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.default.findByIdAndUpdate(id, data, {
        new: true,
    }).lean({ versionKey: false });
    return service;
});
exports.updateService = updateService;
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.default.findById(id);
    if (service) {
        service.isDeleted = true;
        yield service.save();
        return service.toObject({ versionKey: false });
    }
    return null;
});
exports.deleteService = deleteService;
const addReviewToService = (id, rating) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const service = yield service_model_1.default.findById(id);
    if (!service) {
        throw new Error("Service not found");
    }
    // Add the review rating to the array
    (_a = service === null || service === void 0 ? void 0 : service.reviews) === null || _a === void 0 ? void 0 : _a.push(rating);
    yield service.save();
    return service.toObject({ versionKey: false });
});
exports.addReviewToService = addReviewToService;
