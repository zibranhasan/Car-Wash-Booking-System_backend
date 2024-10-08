"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./modules/user/user.route");
const service_route_1 = require("./modules/service/service.route");
const slot_route_1 = require("./modules/slot/slot.route");
const booking_route_1 = require("./modules/booking/booking.route");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const transaction_route_1 = require("./modules/transaction/transaction.route");
const review_route_1 = require("./modules/review/review.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)()); // Use cookie-parser middleware
// Enable CORS for all routes
//transaction route + transaction service
app.use((0, cors_1.default)({
    origin: "https://car-wash-booking-system-livid.vercel.app",
    // origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
}));
//api/v1/
//application routes
app.use("/api", user_route_1.UserRoutes);
app.use("/api", service_route_1.ServiceRoutes);
app.use("/api", slot_route_1.SlotRoutes);
app.use("/api", booking_route_1.BookingRoutes);
app.use("/api", transaction_route_1.TransactionRoutes);
app.use("/api", review_route_1.ReviewRoutes);
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
