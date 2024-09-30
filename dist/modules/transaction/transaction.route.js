"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRoutes = void 0;
// routes/transactionRoutes.ts
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("./transaction.controller");
const router = express_1.default.Router();
router.post("/transactions", transaction_controller_1.TransactionController.createTransaction); // Add a new slot to the transaction
router.get("/transactions", transaction_controller_1.TransactionController.getAllTransactions);
router.get("/transactions/:transactionId", transaction_controller_1.TransactionController.getTransaction);
router.delete("/transactions/:transactionId", transaction_controller_1.TransactionController.deleteTransaction);
exports.TransactionRoutes = router;
