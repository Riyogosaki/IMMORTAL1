import express from "express";
import { checkAuth, login, logout, signup, updateProfile,verifyEmailOtp } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/signup", signup);          // Create user & send OTP
router.post("/verify-otp", verifyEmailOtp); // Verify OTP and mark user verified
router.post("/login", login);            // Login only allowed after verification

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;