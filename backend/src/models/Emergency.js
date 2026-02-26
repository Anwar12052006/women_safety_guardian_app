import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      required: true,
    },

    safetyScore: {
      type: Number,
      required: true,
    },

    location: {
      lat: Number,
      lng: Number,
    },

    status: {
      type: String,
      default: "ACTIVE",
    },

    message: String,

  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Emergency",
  emergencySchema
);
