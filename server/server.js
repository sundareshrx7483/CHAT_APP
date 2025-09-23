import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoute);

try {
  const dbConnection = await mongoose.connect(MONGO_URI);
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
