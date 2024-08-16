import express, { Application } from "express";
const app: Application = express();
import cors from "cors";
import { UserRoutes } from "./modules/user/user.route";
import { ServiceRoutes } from "./modules/service/service.route";
import { SlotRoutes } from "./modules/slot/slot.route";
import { BookingRoutes } from "./modules/booking/booking.route";

//parsers
app.use(express.json());
app.use(cors());

//api/v1/
//application routes
app.use("/api", UserRoutes);
app.use("/api", ServiceRoutes);
app.use("/api", SlotRoutes);
app.use("/api", BookingRoutes);
// Not Found Middleware (should be placed after all route definitions)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
