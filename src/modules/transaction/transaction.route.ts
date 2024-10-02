// routes/transactionRoutes.ts
import express from "express";
import { TransactionController } from "./transaction.controller";
import { Transaction } from "./transaction.model";
import { ServiceSlot } from "../slot/slot.model";

const router = express.Router();

router.post("/transactions", TransactionController.createTransaction); // Add a new slot to the transaction
router.get("/transactions", TransactionController.getAllTransactions);
router.get(
  "/transactions/:transactionId",
  TransactionController.getTransaction
);
router.delete(
  "/transactions/:transactionId",
  TransactionController.deleteTransaction
);
router.post("/payment/success/:tranId", async (req, res) => {
  const { tranId } = req.params;

  try {
    // Find the transaction by the transaction ID
    const transaction = await Transaction.findOne({ tran_id: tranId });

    // Check if the transaction exists
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check if the transaction is already marked as paid
    if (transaction.paidStatus) {
      return res.status(400).json({ message: "Transaction already processed" });
    }

    // Start a session and transaction for atomicity
    const session = await Transaction.startSession();
    session.startTransaction();

    try {
      // Update only the `paidStatus` field to true
      transaction.paidStatus = true;
      await transaction.save({ session });

      // Mark the corresponding ServiceSlot as booked
      const updateResult = await ServiceSlot.updateOne(
        { _id: transaction.slotId }, // Match the slotId
        { $set: { isBooked: "booked" } }, // Mark as booked
        { session }
      );

      // Check if the update was successful
      if (updateResult.modifiedCount === 0) {
        console.error("Failed to update the service slot:", transaction.slotId);
        await session.abortTransaction(); // Abort on failure
        return res
          .status(500)
          .json({ message: "Failed to book the service slot" });
      }

      // Commit the transaction if all updates succeeded
      await session.commitTransaction();
      session.endSession();

      // Redirect to the success page
      return res.redirect("http://localhost:5173/payment/success");
    } catch (error) {
      // Abort the transaction on error
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (err: any) {
    return res.status(500).json({
      message: "Error processing payment",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
});
export const TransactionRoutes = router;
