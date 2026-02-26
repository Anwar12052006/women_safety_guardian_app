
import mongoose from "mongoose";
import Alert from "../models/Alert.js";
// import Patrol from "../models/Patrol.js";
import Incident from "../models/Incident.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// ==========================
// GET DASHBOARD STATS
// ==========================
export const getDashboardStats = async (req, res) => {
  try {
    const [activeAlerts, patrols, pendingIncidents] = await Promise.all([
      Alert.countDocuments({ status: "ACTIVE" }),
      Patrol.countDocuments({ status: "AVAILABLE" }),
      Incident.countDocuments({ status: "PENDING" }),
    ]);

    res.json({
      activeAlerts,
      patrols,
      pendingIncidents,
    });
  } catch (error) {
    console.error("getDashboardStats error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// GET ALL ALERTS
// ==========================
export const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(alerts);
  } catch (error) {
    console.error("getAllAlerts error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// ASSIGN NEAREST PATROL
// ==========================
export const assignNearestPatrol = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { alertId } = req.body;

    if (!alertId) {
      return res.status(400).json({ message: "Alert ID is required" });
    }

    const alert = await Alert.findById(alertId).session(session);

    if (!alert) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Alert not found" });
    }

    if (alert.status !== "ACTIVE") {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Alert already assigned or resolved",
      });
    }

    // const patrol = await Patrol.findOne({
    //   status: "AVAILABLE",
    //   location: {
    //     $near: {
    //       $geometry: alert.location,
    //       $maxDistance: 5000,
    //     },
    //   },
    // }).session(session);

    const patrol = await User.findOne({
      role: "police",
      isAvailable: true,
      isVerified: true,
      location: {
        $near: {
          $geometry: alert.location,
          $maxDistance: 5000,
        },
      },
    }).session(session);

    if (!patrol) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "No patrol nearby" });
    }

    // Update patrol
    // patrol.status = "BUSY";
    // await patrol.save({ session });
    
    // Update patrol availability
      patrol.isAvailable = false;
      await patrol.save({ session });

    // Update alert
    alert.status = "ASSIGNED";
    alert.assignedPatrol = patrol._id;
    await alert.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Patrol Assigned Successfully",
      patrol,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("assignNearestPatrol error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// GET ALL INCIDENT REPORTS
// ==========================
export const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(incidents);
  } catch (error) {
    console.error("getAllIncidents error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// UPDATE INCIDENT STATUS
// ==========================
export const updateIncidentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "PENDING",
      "UNDER_REVIEW",
      "RESOLVED",
      "REJECTED",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    incident.status = status;
    incident.statusHistory.push({
      status: status,
    });
    await incident.save();

    res.json({
      message: "Incident status updated",
      incident,
    });
  } catch (error) {
    console.error("updateIncidentStatus error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// CREATE PATROL OFFICER
// ==========================
export const createPatrolOfficer = async (req, res) => {
  try {
    const { name, email, phone, password, badgeId, vehicleNumber } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const patrol = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "police",
      badgeId,
      vehicleNumber,
      isAvailable: true,
      isVerified: true,
    });

    res.status(201).json({
      message: "Patrol officer created successfully",
      patrol,
    });

  } catch (error) {
    console.error("Create patrol error:", error);
    res.status(500).json({ message: error.message });
  }
};
