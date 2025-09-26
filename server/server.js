import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoute.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import morgan from "morgan";

const { port, mongoUri, jwtSecret } = config;

export const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoutes);
app.use("/api/chats", chatRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  const dbConnection = await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
  if (dbConnection) {
    app.listen(port, () => {
      console.log(`Server started on ${port}`);
    });
  }
} catch (error) {
  console.error(error);
}

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const msg = err.message || "Something went wrong";
  res.status(statusCode).json({ msg });
});
