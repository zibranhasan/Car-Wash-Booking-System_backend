import mongoose, { Schema } from "mongoose";
import { ITransaction } from "./transaction.interface";

const TransactionSchema: Schema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  slotIds: [
    { type: Schema.Types.ObjectId, ref: "ServiceSlot", required: true },
  ], // Array of slotIds
  amount: { type: Number, required: true },
});

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
