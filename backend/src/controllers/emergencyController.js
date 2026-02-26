
import Emergency from "../models/Emergency.js";
import Dashboard from "../models/Dashboard.js";
import { calculatePriority } from "../utils/emergencyPriority.js";
import User from "../models/User.js";
import { sendEmergencySMS } from "../utils/sendEmergencySMS.js";
import { sendNotification } from "../utils/sendNotification.js";
import Alert from "../models/Alert.js";
import Incident from "../models/Incident.js";
import TrustedContact from "../models/TrustedContact.js";
import { getIO } from "../socket.js";


export const triggerEmergency = async (req, res) => {

  try {

    const userId = req.user.userId;
    const user = await User.findById(userId);

    const dashboard = await Dashboard.findOne({ userId });

    if (!dashboard) {

      return res.status(404).json({
        success: false,
        message: "Dashboard not found",
      });

    }

    const safetyScore = dashboard.safetyScore;

    const priority = calculatePriority(safetyScore);


    /**
     * CREATE EMERGENCY RECORD
     */
    const emergency = await Emergency.create({

      userId: userId,

      priority: priority,

      safetyScore: safetyScore,

      location:
        req.body.location ||
        dashboard.lastLocation,

      message: "Emergency triggered",

    });

    // 🔥 CREATE ALERT FOR POLICE DASHBOARD
    // await Alert.create({
    //   user: userId,
    //   location: {
    //     type: "Point",
    //     coordinates: [
    //       user.location.coordinates[0],
    //       user.location.coordinates[1]
    //     ]
    //   },
    //   status: "ACTIVE",
    //   priority: "HIGH"
    // });

    const alert = await Alert.create({
      user: userId,
      location: {
        type: "Point",
        coordinates: [
          user.location.coordinates[0],
          user.location.coordinates[1]
        ]
      },
      status: "ACTIVE",
      priority: "HIGH"
    });




    /**
     * SOCKET REALTIME ALERT
     */
    const io = getIO();

    io.to(userId.toString()).emit(
      "emergencyAlert",
      emergency
    );

    // io.emit("alertUpdated");
    io.to("authority:control").emit("newAlert", alert);


    /**
     * CREATE DATABASE NOTIFICATION
     */
    await sendNotification(

      userId,

      "Emergency Alert",

      `Priority: ${priority}`,

      priority

    );


    /**
     * SEND SMS IF CRITICAL
     */
    if (priority === "CRITICAL") {

      console.log("Sending CRITICAL SMS alert...");

      const user = await User.findById(userId);

      const contacts = await User.find({

        role: { $in: ["family", "police"] }

      });


      for (const contact of contacts) {

        await sendEmergencySMS(

          contact.phone,

          // emergency.location,
          {
            lat: user.location.coordinates[1],
            lng: user.location.coordinates[0]
          },

          user.name || "User"

        );

      }

    }


    res.json({

      success: true,

      data: emergency

    });


  } catch (error) {

    console.error("triggerEmergency error:", error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


export const sendSOS = async (req, res) => {

  try {

    const userId = req.user.userId;

    const user = await User.findById(userId);


    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found"

      });

    }


    console.log("Manual SOS triggered");


    /**
     * FIND CONTACTS
     */
    const contacts = await User.find({

      role: { $in: ["family", "police"] }

    });


    if (!contacts.length) {

      return res.json({

        success: false,

        message: "No trusted contacts found"

      });

    }


    /**
     * GET LOCATION
     */
    const location =

      user.location ||

      req.body.location;


    /**
     * SEND SMS TO CONTACTS
     */
    for (const contact of contacts) {

      await sendEmergencySMS(

        contact.phone,

        location,

        user.name || "User"

      );

    }


    /**
     * SOCKET REALTIME ALERT
     */
    const io = getIO();

    io.emit("emergencyAlert", {

      userId,

      message: "SOS triggered manually",

      location

    });


    /**
     * CREATE EMERGENCY RECORD
     */
    await Emergency.create({

      userId: userId,

      priority: "CRITICAL",

      safetyScore: 0,

      location: location,

      message: "Manual SOS Triggered"

    });

    // 🔥 CREATE ALERT FOR POLICE DASHBOARD
    // await Alert.create({
    //   user: userId,
    //   location: {
    //     type: "Point",
    //     coordinates: [
    //       user.location.coordinates[0],
    //       user.location.coordinates[1]
    //     ]
    //   },
    //   status: "ACTIVE",
    //   priority: "HIGH"
    // });

    const alert = await Alert.create({
      user: userId,
      location: {
        type: "Point",
        coordinates: [
          user.location.coordinates[0],
          user.location.coordinates[1]
        ]
      },
      status: "ACTIVE",
      priority: "HIGH"
    });

    // 🔥 REALTIME UPDATE FOR POLICE
    const io2 = getIO();
    // io2.emit("alertUpdated");
    io2.to("authority:control").emit("newAlert", alert);

    // const io = getIO();
    // io.emit("alertUpdated");


    res.json({

      success: true,

      message: "SOS sent successfully"

    });


  } catch (error) {

    console.error("sendSOS error:", error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

export const getEmergencies = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find users who have added this user as a trusted contact
    const TrustedContact = (await import("../models/TrustedContact.js")).default;
    const contacts = await TrustedContact.find({ contact: userId }).select("owner");
    const trackedUserIds = contacts.map(c => c.owner);

    const targetIds = [userId, ...trackedUserIds];

    const Emergency = (await import("../models/Emergency.js")).default;
    const emergencies = await Emergency.find({ userId: { $in: targetIds } })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: emergencies
    });

  } catch (error) {
    console.error("Fetch emergencies error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch emergencies"
    });
  }
};
