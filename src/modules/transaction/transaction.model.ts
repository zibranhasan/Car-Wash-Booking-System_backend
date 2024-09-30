import mongoose, { Schema } from "mongoose";
import { ITransaction } from "./transaction.interface";

// Define the Transaction Schema
const TransactionSchema: Schema = new Schema({
  email: { type: String, required: true },
  slotId: { type: Schema.Types.ObjectId, ref: "ServiceSlot", required: true },
  amount: { type: Number, required: true },
  tran_id: { type: String },
  paidStatus: { type: Boolean, default: false }, // Initially, payment status is false
});

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
