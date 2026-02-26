
import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    // 👤 Who reported
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📌 Incident Type
    type: {
      type: String,
      enum: ["theft", "harassment", "assault", "suspicious", "other"],
      required: true,
    },

    // 📍 Location (Heatmap & Geo Queries Friendly)
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },

    // 🧾 Suspect Name (Optional)
    suspectName: {
      type: String,
      default: "Unknown",
    },

    // 📝 Description
    description: {
      type: String,
    },

    // 🔥 Severity Score (1–5)
    severity: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },

    // 🚨 Priority (Authority Decision Based)
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "LOW",
    },

    // 📊 Status (Authority Workflow)
    status: {
      type: String,
      enum: ["PENDING", "UNDER_REVIEW", "RESOLVED", "REJECTED"],
      default: "PENDING",
    },

    statusHistory: [
      {
        status: String,
        changedAt: { type: Date, default: Date.now },
      },
    ],

    // 📅 Reported Time
    reportedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// 🚀 2dsphere index for future heatmap & nearest search
incidentSchema.index({ location: "2dsphere" });

export default mongoose.model("Incident", incidentSchema);