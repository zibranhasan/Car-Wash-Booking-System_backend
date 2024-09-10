// routes/transactionRoutes.ts
import express from "express";
import { TransactionController } from "./transaction.controller";

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

export const TransactionRoutes = router;
