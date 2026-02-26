// import express from "express";
// import {
//   registerUser,
//   loginUser,
// } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", registerUser);

// router.post("/login", loginUser);

// export default router;






import express from "express";
import rateLimit from "express-rate-limit";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

/**
 * ==========================
 * RATE LIMITER
 * Prevent brute force attacks
 * ==========================
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

/**
 * ==========================
 * AUTH ROUTES
 * ==========================
 */

// Register
router.post("/register", authLimiter, registerUser);

// Login
router.post("/login", authLimiter, loginUser);

export default router;