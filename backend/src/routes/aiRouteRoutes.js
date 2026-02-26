import express from "express";
import { analyzeRoute } from "../controllers/aiRouteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to analyze safety between start and destination
// Protected via auth middleware
router.post("/analyze", authMiddleware, analyzeRoute);

export default router;
