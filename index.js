import express from "express";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";
dotenv.config(); const PORT = process.env.PORT || 5001;
app.use(cors({ origin: "https://immortal-2.vercel.app", credentials: true, }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
server.listen(PORT, () => { connectDB(); });