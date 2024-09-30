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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const transaction_service_1 = require("./transaction.service");
const transactionService = new transaction_service_1.TransactionService();
class TransactionController {
    static createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, slotId, amount } = req.body;
                const transaction = yield transactionService.addSlotsToTransaction(email, slotId, amount);
                return res.status(201).json(transaction);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Error creating transaction", error });
            }
        });
    }
    static getTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionId = req.params.transactionId;
                const transaction = yield transactionService.getTransactionById(transactionId);
                if (!transaction) {
                    return res.status(404).json({ message: "Transaction not found" });
                }
                return res.status(200).json(transaction);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Error retrieving transaction", error });
            }
        });
    }
    static getAllTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield transactionService.getAllTransactions();
                return res.status(200).json(transactions);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Error retrieving transactions", error });
            }
        });
    }
    static deleteTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionId = req.params.transactionId;
                yield transactionService.deleteTransaction(transactionId);
                return res
                    .status(200)
                    .json({ message: "Transaction deleted successfully" });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Error deleting transaction", error });
            }
        });
    }
}
exports.TransactionController = TransactionController;
