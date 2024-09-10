// services/TransactionService.ts

import mongoose from "mongoose";
import { ServiceSlot } from "../slot/slot.model";
import { ITransaction } from "./transaction.interface";
import { Transaction } from "./transaction.model";

export class TransactionService {
  // Add slotIds to transaction and mark slots as booked
  async addSlotsToTransaction(
    email: string,
    slotIds: string[],
    amount: number
  ) {
    console.log("Received slotIds: ", slotIds); // Log the slotIds

    // Check if slotIds are valid ObjectId instances
    const validSlotIds = slotIds.filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );
    console.log("Valid slotIds for update: ", validSlotIds);

    if (validSlotIds.length === 0) {
      throw new Error("No valid slot IDs were provided.");
    }

    const transaction = await Transaction.findOneAndUpdate(
      { email }, // Match by email
      {
        $addToSet: { slotIds: { $each: validSlotIds } }, // Add slotIds to the array
        amount, // Update or set the amount field
      },
      { new: true, upsert: true } // Create a new transaction if not found
    );

    console.log("Transaction created/updated: ", transaction); // Log the transaction

    if (transaction) {
      // Update the ServiceSlot documents to mark them as booked
      const updateResult = await ServiceSlot.updateMany(
        { _id: { $in: validSlotIds } }, // Match the slotIds
        { $set: { isBooked: "booked" } } // Set isBooked to "booked"
      );

      console.log("Update result for slots: ", updateResult); // Log update result
    } else {
      console.log("Transaction creation or update failed.");
    }

    return transaction;
  }

  async getTransactionById(transactionId: string) {
    return Transaction.findById(transactionId).populate("slotIds");
  }

  async getAllTransactions() {
    return Transaction.find().populate("slotIds");
  }

  async deleteTransaction(transactionId: string) {
    return Transaction.findByIdAndDelete(transactionId);
  }
}
