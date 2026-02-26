import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/roleMiddleware.js";
import {
    getAdminStats,
    getAllUsers,
    getAllAlerts,
    getAllIncidents,
    blockUser,
} from "../controllers/adminController.js";

const router = express.Router();

/**
 * Apply twin middlewares to protect all admin endpoints:
 * 1) authMiddleware parses the JWT and attaches req.user
 * 2) requireAdmin checks if req.user.role === 'admin'
 */
router.use(authMiddleware, requireAdmin);

// Analytics
router.get("/stats", getAdminStats);

// Resource Tables
router.get("/users", getAllUsers);
router.get("/alerts", getAllAlerts);
router.get("/incidents", getAllIncidents);

// Admin Actions
router.patch("/users/:id/block", blockUser);

export default router;
