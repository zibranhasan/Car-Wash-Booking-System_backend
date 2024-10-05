// services/TransactionService.ts

import { Transaction } from "./transaction.model";
import config from "../../app/config";
import { ServiceSlot } from "../slot/slot.model";

const SSLCommerzPayment = require("sslcommerz-lts");

const store_id = config.STORE_ID;
const store_passwd = config.STORE_PASS;
const is_live = false;

export class TransactionService {
  async addSlotsToTransaction(email: string, slotId: string, amount: number) {
    //adding extra layer for checking slot is already booked or not
    const slot = await ServiceSlot.findById(slotId);
    if (!slot) {
      throw new Error("The specified slot does not exist.");
    }

    if (slot.isBooked === "booked") {
      throw new Error(
        "This slot is already booked. Please choose another slot."
      );
    }
    // Add slotIds to transaction and initiate the payment process
    const tran_id = `REF${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const data = {
      total_amount: amount,
      currency: "BDT",
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: `http://localhost:5000/api/payment/success/${tran_id}`,
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
    const apiResponse = await sslcz.init(data);
    const GatewayPageURL = apiResponse.GatewayPageURL;

    if (!GatewayPageURL) {
      throw new Error("Failed to generate payment URL");
    }

    // Create and save the transaction to the database
    const transaction = new Transaction({
      email,
      slotId,
      amount,
      tran_id: tran_id,
      paidStatus: false,
    });

    await transaction.save(); // Ensure the transaction is saved to the DB

    // Return the payment URL to the client
    return { url: GatewayPageURL };
  }

  async getTransactionById(transactionId: string) {
    return Transaction.findById(transactionId).populate("slotIds");
  }

  async getAllTransactions() {
    return Transaction.find().populate("slotId");
  }

  async deleteTransaction(transactionId: string) {
    return Transaction.findByIdAndDelete(transactionId);
  }
}
