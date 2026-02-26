import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware to verify that the logged-in user has the "admin" role.
 * This MUST be placed AFTER authMiddleware in the route chain,
 * so req.user is already decoded and populated.
 */
export const requireAdmin = async (req, res, next) => {
    try {
        // req.user is populated by authMiddleware
        if (!req.user || !req.user.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required before role check.",
            });
        }

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access Denied: Admin privileges required.",
            });
        }

        // Role is valid, proceed to controller
        next();
    } catch (error) {
        console.error("Admin Auth Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error verifying admin role.",
        });
    }
};
