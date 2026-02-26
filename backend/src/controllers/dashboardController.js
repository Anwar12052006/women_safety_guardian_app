import Dashboard from "../models/Dashboard.js";
import { calculateSafetyScore } from "../utils/safetyScoreCalculator.js";
import { calculateLocationRisk } from "../utils/locationRiskCalculator.js";
import Incident from "../models/Incident.js";
import { emitDashboardUpdate } from "../utils/socketEmitter.js";
import { sendNotification } from "../utils/sendNotification.js";


// GET DASHBOARD DATA
export const getDashboard = async (req, res) => {

  try {

    let dashboard = await Dashboard.findOne({
      userId: req.user.userId,
    });

    if (!dashboard) {

      dashboard = await Dashboard.create({
        userId: req.user.userId,
      });

    }

    /**
     * AUTO CALCULATE SAFETY SCORE
     */

    const crimeRate = Math.floor(Math.random() * 40);

    const timeRisk =
      new Date().getHours() >= 20 ||
        new Date().getHours() <= 5
        ? 30
        : 10;

    const userLocation = req.user.location || { lat: 0, lng: 0 };

    const nearbyIncidents = await Incident.find({
      "location.lat": {
        $gte: userLocation.lat - 0.05,
        $lte: userLocation.lat + 0.05,
      },
      "location.lng": {
        $gte: userLocation.lng - 0.05,
        $lte: userLocation.lng + 0.05,
      },
    });

    const risk = calculateLocationRisk(nearbyIncidents, timeRisk);

    dashboard.areaSafety = risk.level;
    dashboard.safetyScore = risk.score;
    dashboard.aiInsight = risk.insight;
    await dashboard.save();
    await sendNotification(
      req.user.userId,
      "Test Notification",
      "Socket is working",
      "INFO"
    );

    emitDashboardUpdate(req.user.userId, dashboard);


    res.json({
      success: true,
      data: dashboard,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching dashboard",
    });

  }

};



// UPDATE MONITORING
export const updateMonitoring = async (req, res) => {
  try {

    const dashboard = await Dashboard.findOneAndUpdate(
      { userId: req.user.userId },
      {
        monitoring: req.body,
      },
      { new: true }
    );

    res.json({
      success: true,
      data: dashboard,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating monitoring",
    });
  }
};



// ADD ACTIVITY
export const addActivity = async (req, res) => {

  try {

    const dashboard = await Dashboard.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $push: {
          recentActivity: {
            message: req.body.message,
            type: req.body.type,
          },
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      data: dashboard,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding activity",
    });
  }
};



// START CHECKIN TIMER
export const startCheckInTimer = async (req, res) => {

  try {

    const dashboard = await Dashboard.findOneAndUpdate(
      { userId: req.user.userId },
      {
        checkInTimerActive: true,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Check-in timer started",
      data: dashboard,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error starting timer",
    });
  }
};



// FAKE CALL
export const triggerFakeCall = async (req, res) => {

  try {

    await Dashboard.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $push: {
          recentActivity: {
            message: "Fake call triggered",
            type: "fake_call",
          },
        },
      }
    );

    res.json({
      success: true,
      message: "Fake call triggered",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error triggering fake call",
    });
  }
};
