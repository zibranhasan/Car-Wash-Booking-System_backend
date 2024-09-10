"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./modules/user/user.route");
const service_route_1 = require("./modules/service/service.route");
const slot_route_1 = require("./modules/slot/slot.route");
const booking_route_1 = require("./modules/booking/booking.route");
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//api/v1/
//application routes
app.use("/api", user_route_1.UserRoutes);
app.use("/api", service_route_1.ServiceRoutes);
app.use("/api", slot_route_1.SlotRoutes);
app.use("/api", booking_route_1.BookingRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Not Found Middleware (should be placed after all route definitions)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    });
});
exports.default = app;
