import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import categoryRoute from "./routes/categoryRoute.js";
import ApiError from "./utils/apiError.js";
import globalError from "./middlewares/errorMiddleware.js";

dotenv.config({ path: "config.env" });

// Connect to database
dbConnection();

const app = express();

// Middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`node: ${process.env.NODE_ENV}`);
}

// mount Routes
app.use("/api/v1/categories", categoryRoute);

// Handle unhandled routes
app.all("/*splat", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handler middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
