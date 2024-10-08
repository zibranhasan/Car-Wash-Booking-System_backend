"use strict";
// services/TransactionService.ts
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
exports.TransactionService = void 0;
const transaction_model_1 = require("./transaction.model");
const config_1 = __importDefault(require("../../app/config"));
const slot_model_1 = require("../slot/slot.model");
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = config_1.default.STORE_ID;
const store_passwd = config_1.default.STORE_PASS;
const is_live = false;
class TransactionService {
    addSlotsToTransaction(email, slotId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            //adding extra layer for checking slot is already booked or not
            const slot = yield slot_model_1.ServiceSlot.findById(slotId);
            if (!slot) {
                throw new Error("The specified slot does not exist.");
            }
            if (slot.isBooked === "booked") {
                throw new Error("This slot is already booked. Please choose another slot.");
            }
            // Add slotIds to transaction and initiate the payment process
            const tran_id = `REF${Date.now()}${Math.floor(Math.random() * 1000)}`;
            const data = {
                total_amount: amount,
                currency: "BDT",
                tran_id: tran_id, // use unique tran_id for each api call
                success_url: `https://car-washing-backend-coral.vercel.app/api/payment/success/${tran_id}`,
                // success_url: `http://localhost:5000/api/payment/success/${tran_id}`,
                fail_url: "http://localhost:3030/fail",
                cancel_url: "http://localhost:3030/cancel",
                ipn_url: "http://localhost:3030/ipn",
                shipping_method: "Courier",
                product_name: "Computer.",
                product_category: "Electronic",
                product_profile: "general",
                cus_name: "Customer Name",
                cus_email: email,
                cus_add1: "Dhaka",
                cus_add2: "Dhaka",
                cus_city: "Dhaka",
                cus_state: "Dhaka",
                cus_postcode: "1000",
                cus_country: "Bangladesh",
                cus_phone: "01711111111",
                cus_fax: "01711111111",
                ship_name: "Customer Name",
                ship_add1: "Dhaka",
                ship_add2: "Dhaka",
                ship_city: "Dhaka",
                ship_state: "Dhaka",
                ship_postcode: 1000,
                ship_country: "Bangladesh",
            };
            // Initialize SSLCommerzPayment
            const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
            // Generate the payment URL
            const apiResponse = yield sslcz.init(data);
            const GatewayPageURL = apiResponse.GatewayPageURL;
            if (!GatewayPageURL) {
                throw new Error("Failed to generate payment URL");
            }
            // Create and save the transaction to the database
            const transaction = new transaction_model_1.Transaction({
                email,
                slotId,
                amount,
                tran_id: tran_id,
                paidStatus: false,
            });
            yield transaction.save(); // Ensure the transaction is saved to the DB
            // Return the payment URL to the client
            return { url: GatewayPageURL };
        });
    }
    getTransactionById(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return transaction_model_1.Transaction.findById(transactionId).populate("slotIds");
        });
    }
    getAllTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            return transaction_model_1.Transaction.find().populate("slotId");
        });
    }
    deleteTransaction(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return transaction_model_1.Transaction.findByIdAndDelete(transactionId);
        });
    }
}
exports.TransactionService = TransactionService;
