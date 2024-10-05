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
exports.TransactionRoutes = void 0;
// routes/transactionRoutes.ts
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("./transaction.controller");
const transaction_model_1 = require("./transaction.model");
const slot_model_1 = require("../slot/slot.model");
const router = express_1.default.Router();
router.post("/transactions", transaction_controller_1.TransactionController.createTransaction); // Add a new slot to the transaction
router.get("/transactions", transaction_controller_1.TransactionController.getAllTransactions);
router.get("/transactions/:transactionId", transaction_controller_1.TransactionController.getTransaction);
router.delete("/transactions/:transactionId", transaction_controller_1.TransactionController.deleteTransaction);
router.post("/payment/success/:tranId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tranId } = req.params;
    try {
        // Find the transaction by the transaction ID
        const transaction = yield transaction_model_1.Transaction.findOne({ tran_id: tranId });
        // Check if the transaction exists
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        // Check if the transaction is already marked as paid
        if (transaction.paidStatus) {
            return res.status(400).json({ message: "Transaction already processed" });
        }
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
            // Check if the update was successful
            if (updateResult.modifiedCount === 0) {
                console.error("Failed to update the service slot:", transaction.slotId);
                yield session.abortTransaction(); // Abort on failure
                return res
                    .status(500)
                    .json({ message: "Failed to book the service slot" });
            }
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
exports.TransactionRoutes = router;
