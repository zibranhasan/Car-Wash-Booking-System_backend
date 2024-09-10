// controllers/TransactionController.ts
import { Request, Response } from "express";
import { TransactionService } from "./transaction.service";

const transactionService = new TransactionService();

export class TransactionController {
  static async createTransaction(req: Request, res: Response) {
    try {
      const { email, slotIds,amount } = req.body;

      // Validate that slotIds is an array
      if (!Array.isArray(slotIds)) {
        return res.status(400).json({ message: "slotIds must be an array" });
      }

      const transaction = await transactionService.addSlotsToTransaction(
        email,
        slotIds,
        amount
      );
      return res.status(201).json(transaction);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating transaction", error });
    }
  }

  static async getTransaction(req: Request, res: Response) {
    try {
      const transactionId = req.params.transactionId;
      const transaction = await transactionService.getTransactionById(
        transactionId
      );
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      return res.status(200).json(transaction);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving transaction", error });
    }
  }

  static async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await transactionService.getAllTransactions();
      return res.status(200).json(transactions);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving transactions", error });
    }
  }

  static async deleteTransaction(req: Request, res: Response) {
    try {
      const transactionId = req.params.transactionId;
      await transactionService.deleteTransaction(transactionId);
      return res
        .status(200)
        .json({ message: "Transaction deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting transaction", error });
    }
  }
}
