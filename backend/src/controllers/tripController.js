import Trip from "../models/Trip.js";
import TrustedContact from "../models/TrustedContact.js";

export const startTrip = async (req, res) => {
    try {
        const { startCoordinates, destinationCoordinates, eta, startAddress, destAddress } = req.body;

        const trip = await Trip.create({
            userId: req.user.userId,
            startLocation: { type: "Point", coordinates: startCoordinates, address: startAddress },
            destination: { type: "Point", coordinates: destinationCoordinates, address: destAddress },
            eta
        });

        res.status(201).json({ success: true, data: trip });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to start trip" });
    }
};

export const getTrips = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Find users who have added this user as a trusted contact
        const contacts = await TrustedContact.find({ contact: userId }).select("owner");
        const trackedUserIds = contacts.map(c => c.owner);

        // Include own trips AND trips of tracked users
        const targetIds = [userId, ...trackedUserIds];

        const trips = await Trip.find({ userId: { $in: targetIds } })
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        res.json({ success: true, data: trips });
    } catch (error) {
        console.error("Fetch trips error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch trips" });
    }
};

export const endTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { status: "Completed", completedAt: Date.now() },
            { new: true }
        );
        res.json({ success: true, data: trip });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to end trip" });
    }
};
