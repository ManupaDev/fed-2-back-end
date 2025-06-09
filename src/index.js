import "dotenv/config";
import express from "express";
import productRouter from "./api/product.js";
import categoryRouter from "./api/category.js";
import reviewRouter from "./api/review.js";
import { connectDB } from "./infrastructure/db/index.js";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); //It conversts the incomign json payload of a  request into a javascript object found in req.body

// app.use((req, res, next) => {
//   console.log("Hello from pre-middleware");
//   next();
// });

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/reviews", reviewRouter);

app.use(globalErrorHandlingMiddleware);

connectDB();

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
