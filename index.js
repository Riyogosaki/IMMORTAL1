import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ------------------- MIDDLEWARE -------------------
app.use(express.json({ limit: "10mb" })); // for large profilePic uploads
app.use(cookieParser());

app.use(
  cors({
    origin: "https://immortal-2.vercel.app",
    credentials: true, // allow cookies
  })
);

// ------------------- ROUTES -------------------
app.use("/api/auth", authRoutes);

// ------------------- DEFAULT ROUTE -------------------
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// ------------------- START SERVER -------------------
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
