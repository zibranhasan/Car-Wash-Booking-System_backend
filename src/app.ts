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
