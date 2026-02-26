

import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },

    status: {
      type: String,
      enum: ["ACTIVE", "ASSIGNED", "RESOLVED"],
      default: "ACTIVE",
    },

    priority: {
      type: String,
      enum: ["HIGH", "MEDIUM", "LOW"],
      default: "HIGH",
    },
    assignedPatrol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patrol",
    },
  },
  { timestamps: true } // 🔥 IMPORTANT
);

alertSchema.index({ location: "2dsphere" });

export default mongoose.model("Alert", alertSchema);