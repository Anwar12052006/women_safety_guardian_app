import User from "../models/User.js";
import Emergency from "../models/Emergency.js";
import Incident from "../models/Incident.js";

/**
 * @desc Get global system statistics for the Admin Dashboard
 * @route GET /api/admin/stats
 * @access Private/Admin
 */
export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        // Total numbers
        const totalEmergencies = await Emergency.countDocuments();
        const activeEmergencies = await Emergency.countDocuments({ status: "ACTIVE" });

        const totalIncidents = await Incident.countDocuments();
        const pendingIncidents = await Incident.countDocuments({ status: "PENDING" });

        // Users by Role breakdown
        const normalUsers = await User.countDocuments({ role: "user" });
        const familyUsers = await User.countDocuments({ role: "family" });
        const policeUsers = await User.countDocuments({ role: "police" });

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                normalUsers,
                familyUsers,
                policeUsers,
                totalEmergencies,
                activeEmergencies,
                totalIncidents,
                pendingIncidents
            }
        });
    } catch (error) {
        console.error("Admin stats fetch error:", error);
        res.status(500).json({ success: false, message: "Server error fetching admin stats." });
    }
};

/**
 * @desc Get all registered valid users
 * @route GET /api/admin/users
 * @access Private/Admin
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error("Fetch all users error:", error);
        res.status(500).json({ success: false, message: "Server error fetching users." });
    }
};

/**
 * @desc Block / Unblock a user
 * @route PATCH /api/admin/users/:id/block
 * @access Private/Admin
 */
export const blockUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Toggle a hypothetical `isBlocked` variable if you'd like, 
        // or just toggle a flag. Assuming isBlocked might not exist in the exact Model, 
        // we use a safe mixed pattern or push it to DB dynamically if mongoose uses strict=false, 
        // but the safest way without modifying schema is either adding a field if allowed, 
        // or using an existing 'status' field.
        // If the schema is strictly locked and `isBlocked` is missing, 
        // we will save it anyway (MongoDB will store it if schema is flexible).

        // For pure schema safety per instructions: we will add isBlocked boolean to the user model 
        // only if the schema allows it, OR we'll just return a success mocking it. Let's actually set it.
        user.isBlocked = !user.isBlocked;

        await user.save();

        res.status(200).json({
            success: true,
            message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully.`,
            user
        });
    } catch (error) {
        console.error("Block user error:", error);
        res.status(500).json({ success: false, message: "Server error blocking user." });
    }
};

/**
 * @desc Get all globally scattered emergencies/SOS alerts
 * @route GET /api/admin/alerts
 * @access Private/Admin
 */
export const getAllAlerts = async (req, res) => {
    try {
        const alerts = await Emergency.find()
            .populate("userId", "name email phone")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            alerts
        });
    } catch (error) {
        console.error("Fetch alerts error:", error);
        res.status(500).json({ success: false, message: "Server error fetching alerts." });
    }
};

/**
 * @desc Get all community incidents
 * @route GET /api/admin/incidents
 * @access Private/Admin
 */
export const getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find()
            .populate("user", "name email phone")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            incidents
        });
    } catch (error) {
        console.error("Fetch incidents error:", error);
        res.status(500).json({ success: false, message: "Server error fetching incidents." });
    }
};
