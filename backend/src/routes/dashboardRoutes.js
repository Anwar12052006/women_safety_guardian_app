import express from "express";

import {
  getDashboard,
  updateMonitoring,
  addActivity,
  startCheckInTimer,
  triggerFakeCall,
} from "../controllers/dashboardController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getDashboard);

router.patch("/monitoring", authMiddleware, updateMonitoring);

router.post("/activity", authMiddleware, addActivity);

router.post("/checkin", authMiddleware, startCheckInTimer);

router.post("/fake-call", authMiddleware, triggerFakeCall);

export default router;
