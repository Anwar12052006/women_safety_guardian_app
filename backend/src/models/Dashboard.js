import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    safetyScore: {
      type: Number,
      default: 80,
    },

    monitoring: {
      autoSOS: {
        type: Boolean,
        default: true,
      },
      guardianTracking: {
        type: Boolean,
        default: true,
      },
      checkInTimer: {
        type: Boolean,
        default: false,
      },
    },

    areaSafety: {
      type: String,
      enum: ["SAFE", "MODERATE", "DANGER", "HIGH RISK"], // Added HIGH RISK as it's returned by calc
      default: "SAFE",
    },

    aiInsight: {
      type: String,
      default: "Your current safety level is stable.",
    },

    recentActivity: [
      {
        message: String,
        type: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    checkInTimerActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Dashboard", dashboardSchema);
