import cron from "node-cron";
import Dashboard from "../models/Dashboard.js";
import User from "../models/User.js";
import { calculateSafetyScore } from "../utils/safetyScoreCalculator.js";
import { sendNotification } from "../utils/sendNotification.js";
import { getIO } from "../socket.js";

/**
 * Runs every 1 minute
 * Automatically updates safety score
 */

export const startSafetyScoreJob = () => {

  cron.schedule("* * * * *", async () => {

    try {

      console.log("Running safety score background job...");

      const dashboards = await Dashboard.find();

      for (const dashboard of dashboards) {

        const user = await User.findById(dashboard.userId);

        if (!user) continue;

        /**
         * Calculate risk factors
         */

        const crimeRate = Math.floor(Math.random() * 40);

        const timeRisk =
          new Date().getHours() >= 20 ||
          new Date().getHours() <= 5
            ? 30
            : 10;

        const nearbyIncidents =
          dashboard.recentActivity.length;

        const inactivityRisk =
          Math.floor(Math.random() * 10);

        const newScore = calculateSafetyScore({
          crimeRate,
          timeRisk,
          nearbyIncidents,
          inactivityRisk,
        });

        /**
         * Update dashboard
         */

        dashboard.safetyScore = newScore;

        dashboard.areaSafety =
          newScore >= 80
            ? "SAFE"
            : newScore >= 50
            ? "MODERATE"
            : "DANGER";

        await dashboard.save();

        /**
         * Send realtime update
         */

        const io = getIO();

        io.to(dashboard.userId.toString()).emit(
          `dashboard:${dashboard.userId}`,
          dashboard
        );

        /**
         * Send notification if danger
         */

        if (newScore < 50) {

          await sendNotification(
            dashboard.userId,
            "Safety Alert",
            "Your safety score dropped. Stay alert.",
            "WARNING"
          );

        }

      }

    } catch (error) {

      console.error(
        "Background Job Error:",
        error.message
      );

    }

  });

};
