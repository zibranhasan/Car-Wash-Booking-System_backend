import express, { Application } from "express";

import cors from "cors";
import { UserRoutes } from "./modules/user/user.route";
import { ServiceRoutes } from "./modules/service/service.route";
import { SlotRoutes } from "./modules/slot/slot.route";
import { BookingRoutes } from "./modules/booking/booking.route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { TransactionRoutes } from "./modules/transaction/transaction.route";
import { ReviewRoutes } from "./modules/review/review.route";
import { Transaction } from "./modules/transaction/transaction.model";
import { ServiceSlot } from "./modules/slot/slot.model";

const app: Application = express();

// parsers
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser middleware

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//api/v1/
//application routes
app.use("/api", UserRoutes);
app.use("/api", ServiceRoutes);
app.use("/api", SlotRoutes);
app.use("/api", BookingRoutes);
app.use("/api", TransactionRoutes);
app.use("/api", ReviewRoutes);

// app.post("/payment/success/:tranId", async (req, res) => {
//   const { tranId } = req.params;

//   try {
//     // Find the transaction by the transaction ID
//     const transaction = await Transaction.findOne({ tran_id: tranId });

//     // Check if the transaction exists
//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }

//     // // Check if the transaction is already marked as paid
//     // if (transaction.paidStatus) {
//     //   return res.status(400).json({ message: "Transaction already processed" });
//     // }

//     // Start a session and transaction for atomicity
//     const session = await Transaction.startSession();
//     session.startTransaction();

//     try {
//       // Update only the `paidStatus` field to true
//       transaction.paidStatus = true;
//       await transaction.save({ session });

//       // Mark the corresponding ServiceSlot as booked
//       const updateResult = await ServiceSlot.updateOne(
//         { _id: transaction.slotId }, // Match the slotId
//         { $set: { isBooked: "booked" } }, // Mark as booked
//         { session }
//       );

//       // // Check if the update was successful
//       // if (updateResult.modifiedCount === 0) {
//       //   console.error("Failed to update the service slot:", transaction.slotId);
//       //   await session.abortTransaction(); // Abort on failure
//       //   return res
//       //     .status(500)
//       //     .json({ message: "Failed to book the service slot" });
//       // }

//       // Commit the transaction if all updates succeeded
//       await session.commitTransaction();
//       session.endSession();

//       // Redirect to the success page
//       return res.redirect("http://localhost:5173/payment/success");
//     } catch (error) {
//       // Abort the transaction on error
//       await session.abortTransaction();
//       session.endSession();
//       throw error;
//     }
//   } catch (err: any) {
//     return res.status(500).json({
//       message: "Error processing payment",
//       error: err instanceof Error ? err.message : "Unknown error",
//     });
//   }
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Not Found Middleware (should be placed after all route definitions)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});
export default app;
