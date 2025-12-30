import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import mongoose from "mongoose";

dotenv.config();
const PORT = 5001;

/* ======================
   ✅ CORS FIRST (IMPORTANT)
====================== */
app.use(
  cors({
    origin: "https://immortal-2.vercel.app",
    credentials: true,
  })
);

/* ======================
   ✅ BODY & COOKIES
====================== */
app.use(express.json());
app.use(cookieParser());

/* ======================
   ✅ ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* ======================
   ✅ SERVER
====================== */
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB error:", error);
  }
};

server.listen(PORT, () => {
  connectDb();
});
