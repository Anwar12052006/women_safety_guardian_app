import express from "express";
import Patrol from "../models/Patrol.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/*
=====================================
GET ALL AVAILABLE PATROLS
GET /api/patrols
=====================================
*/
router.get("/", authMiddleware,  async (req, res) => {
  try {
    const patrols = await Patrol.find({ status: "AVAILABLE" });
    res.json(patrols);
  } catch (error) {
    console.error("Patrol fetch error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;