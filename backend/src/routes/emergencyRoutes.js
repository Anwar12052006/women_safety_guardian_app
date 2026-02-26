import express from "express";

import authMiddleware
  from "../middleware/authMiddleware.js";

import {
  triggerEmergency,
  sendSOS,
  getEmergencies
}
  from "../controllers/emergencyController.js";

const router = express.Router();

router.post(
  "/trigger",
  authMiddleware,
  triggerEmergency
);

router.post(
  "/sos",
  authMiddleware,
  sendSOS
);

router.get(
  "/",
  authMiddleware,
  getEmergencies
);

export default router;
