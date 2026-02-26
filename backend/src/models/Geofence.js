import mongoose from "mongoose";

const geofenceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
            default: "Point",
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    radius: {
        type: Number,
        required: true, // in meters
        default: 500
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

geofenceSchema.index({ location: "2dsphere" });

export default mongoose.model("Geofence", geofenceSchema);
