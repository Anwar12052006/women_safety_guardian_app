

import mongoose from "mongoose";

const trustedContactSchema = new mongoose.Schema(
  {
    // Woman who sends invite
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Guardian user account (after accept)
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    // Email used for invite
    contactEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    relation: {
      type: String,
      enum: [
        "Father",
        "Mother",
        "Brother",
        "Sister",
        "Friend",
        "Guardian",
        "Other",
      ],
      default: "Other",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      index: true,
    },

    statusReason: {
      type: String,
      default: null,
    },

    respondedAt: {
      type: Date,
      default: null,
    },

    inviteToken: {
      type: String,
      unique: true,
      sparse: true, // allows null values
      index: true,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

/**
 * ============================================
 * INDEXES FOR PERFORMANCE & SAFETY
 * ============================================
 */

// Prevent duplicate invite from same owner to same email
trustedContactSchema.index(
  { owner: 1, contactEmail: 1, isActive: 1 },
  { unique: true }
);

// Fast query for owner + status
trustedContactSchema.index({ owner: 1, status: 1 });
// countDocuments({ owner, isActive: true })
// Fast lookup when guardian logs in
trustedContactSchema.index({ contact: 1, status: 1 });

// TTL index only removes expired pending invites
trustedContactSchema.index(
  { expiresAt: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { status: "pending" },
  }
);

const TrustedContact =
  mongoose.models.TrustedContact ||
  mongoose.model("TrustedContact", trustedContactSchema);

export default TrustedContact;