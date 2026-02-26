import express from "express";
import { getLocationRisk } from "../controllers/locationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/risk", authMiddleware, getLocationRisk);

export default router;
