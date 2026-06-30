

import express from "express";
import rateLimit from "express-rate-limit";

import {
  addTrustedContact,
  getTrustedContacts,
  deleteTrustedContact,
  sendSOSToAll,
} from "../controllers/trustedContactController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ==========================
 * RATE LIMITERS
 * ==========================
 */

// Limit contact modifications
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many contact requests. Try again later.",
  },
});

// Strict limiter for SOS
const sosLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: {
    success: false,
    message: "Too many SOS attempts. Please wait.",
  },
});

/**
 * ==========================
 * ROUTES
 * ==========================
 */

// 🔥 DEBUG TEST ROUTE (Temporary)
// router.post("/", (req, res) => {
//   console.log("POST HIT");
//   res.json({ test: true });
// });

// Add trusted contact
router.post(
  "/",
  authMiddleware,
  contactLimiter,
  addTrustedContact
);

// Get all trusted contacts
router.get(
  "/",
  authMiddleware,
  getTrustedContacts
);

// Delete contact
router.delete(
  "/:id",
  authMiddleware,
  contactLimiter,
  deleteTrustedContact
);

// Send SOS to all accepted contacts
router.post(
  "/sos",
  authMiddleware,
  sosLimiter,
  sendSOSToAll
);

export default router;