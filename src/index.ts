import "dotenv/config";
import express from "express";
import productRouter from "./api/product";
import categoryRouter from "./api/category";
import reviewRouter from "./api/review";
import { connectDB } from "./infrastructure/db/index";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import cors from "cors";
import { orderRouter } from "./api/order";
import { clerkMiddleware } from "@clerk/express";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); //It conversts the incomign json payload of a  request into a javascript object found in req.body

app.use(clerkMiddleware());
app.use(cors({ origin: "http://localhost:5173" }));

// app.use((req, res, next) => {
//   console.log("Hello from pre-middleware");
//   next();
// });

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);

app.use(globalErrorHandlingMiddleware);

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
