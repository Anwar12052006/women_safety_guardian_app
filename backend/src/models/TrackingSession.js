import mongoose from "mongoose";

const trackingSessionSchema = new mongoose.Schema(
{
  userId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  trackers:
  [
    {
      name: String,
      phone: String,
      startedAt: Date
    }
  ],

  isActive:
  {
    type: Boolean,
    default: true
  }

},
{ timestamps: true }
);

export default mongoose.model(
  "TrackingSession",
  trackingSessionSchema
);
