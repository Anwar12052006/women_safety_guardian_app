import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    startLocation: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true },
        address: String,
    },
    destination: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true },
        address: String,
    },
    eta: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Active", "Completed", "Delayed", "SOS"],
        default: "Active",
    },
    progressUpdates: [{
        location: {
            type: { type: String, enum: ["Point"], default: "Point" },
            coordinates: [Number],
        },
        timestamp: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    completedAt: {
        type: Date,
    }
});

tripSchema.index({ startLocation: "2dsphere" });
tripSchema.index({ destination: "2dsphere" });

export default mongoose.model("Trip", tripSchema);
