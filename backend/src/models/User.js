
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "family", "police", "admin"],
      default: "user",
      index: true,
    },

    // If user is family, this links to main user
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
    index: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: function () {
          return this.role === "user" || this.role === "police";
        },
      },
    },

    // Police specific
    badgeId: {
      type: String,
      trim: true,
      default: null,
    },

    vehicleNumber: {
      type: String,
      default: null,
    },

    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },

    // Subscription plan (for main user only)
    subscriptionPlan: {
    type: String,
    enum: ["free", "pro", "enterprise"],
    default: "free",
    index: true,
    },
  },
  { timestamps: true }
);

// Geo index
userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);

export default User;