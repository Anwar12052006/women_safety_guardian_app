
import mongoose from "mongoose";

const patrolSchema = new mongoose.Schema({
  officerName: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
  status: { type: String, default: "AVAILABLE" },
});

patrolSchema.index({ location: "2dsphere" });

const Patrol =
  mongoose.models.Patrol || mongoose.model("Patrol", patrolSchema);

export default Patrol;