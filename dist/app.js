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
const transaction_model_1 = require("./modules/transaction/transaction.model");
const slot_model_1 = require("./modules/slot/slot.model");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)()); // Use cookie-parser middleware
// Enable CORS for all routes
app.use((0, cors_1.default)({
    origin: "https://car-wash-booking-system-livid.vercel.app",
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
app.post("/payment/success/:tranId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tranId } = req.params;
    try {
        // Find the transaction by the transaction ID
        const transaction = yield transaction_model_1.Transaction.findOne({ tran_id: tranId });
        // Check if the transaction exists
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        // // Check if the transaction is already marked as paid
        // if (transaction.paidStatus) {
        //   return res.status(400).json({ message: "Transaction already processed" });
        // }
        // Start a session and transaction for atomicity
        const session = yield transaction_model_1.Transaction.startSession();
        session.startTransaction();
        try {
            // Update only the `paidStatus` field to true
            transaction.paidStatus = true;
            yield transaction.save({ session });
            // Mark the corresponding ServiceSlot as booked
            const updateResult = yield slot_model_1.ServiceSlot.updateOne({ _id: transaction.slotId }, // Match the slotId
            { $set: { isBooked: "booked" } }, // Mark as booked
            { session });
            // // Check if the update was successful
            // if (updateResult.modifiedCount === 0) {
            //   console.error("Failed to update the service slot:", transaction.slotId);
            //   await session.abortTransaction(); // Abort on failure
            //   return res
            //     .status(500)
            //     .json({ message: "Failed to book the service slot" });
            // }
            // Commit the transaction if all updates succeeded
            yield session.commitTransaction();
            session.endSession();
            // Redirect to the success page
            return res.redirect("https://car-wash-booking-system-livid.vercel.app/payment/success");
        }
        catch (error) {
            // Abort the transaction on error
            yield session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
    catch (err) {
        return res.status(500).json({
            message: "Error processing payment",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}));
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
