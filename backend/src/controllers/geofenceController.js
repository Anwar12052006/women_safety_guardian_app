import Geofence from "../models/Geofence.js";
import TrustedContact from "../models/TrustedContact.js";

export const createGeofence = async (req, res) => {
    try {
        const { name, coordinates, radius, targetUserId } = req.body;

        // Guardian creating a fence for a user
        const geofence = await Geofence.create({
            userId: targetUserId || req.user.userId,
            ownerId: req.user.userId,
            name,
            location: {
                type: "Point",
                coordinates
            },
            radius
        });

        res.status(201).json({ success: true, data: geofence });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating geofence" });
    }
};

export const getGeofences = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Find users who have added this user as a trusted contact
        const contacts = await TrustedContact.find({ contact: userId }).select("owner");
        const trackedUserIds = contacts.map(c => c.owner);

        const targetIds = [userId, ...trackedUserIds];

        const geofences = await Geofence.find({
            $or: [{ userId: { $in: targetIds } }, { ownerId: userId }]
        });
        res.json({ success: true, data: geofences });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching geofences" });
    }
};

export const deleteGeofence = async (req, res) => {
    try {
        await Geofence.findOneAndDelete({
            _id: req.params.id,
            ownerId: req.user.userId
        });
        res.json({ success: true, message: "Geofence deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting geofence" });
    }
};
