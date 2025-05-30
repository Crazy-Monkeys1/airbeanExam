import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";
import authRouter from "./routes/auth.js";
import menuRouter from "./routes/menu.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";

// Config

dotenv.config();
const app = express();
const PORT = process.env.PORT;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

// Middlewares

app.use(express.json());
app.use(logger);

// Routes

app.use("/api/auth", authRouter);
app.use("/api/menu", menuRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

// DB

database.on("error", (error) => console.log(error));
database.once("connected", () => {
  console.log("DB Connected");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Error handling

app.use(errorHandler);
