import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import categoryRoute from "./routes/categoryRoute.js";

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

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
