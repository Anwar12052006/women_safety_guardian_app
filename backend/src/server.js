
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import mongoose from "mongoose";

import app from "./app.js";
import connectDB from "./config/db.js";
import authorityRoutes from "./routes/authorityRoutes.js";

import { initSocket } from "./socket.js";
import { startSafetyScoreJob } from "./jobs/safetyScoreJob.js";

import incidentRoutes from "./routes/incidentRoutes.js";

// ==============================
// ENVIRONMENT VARIABLES CHECK
// ==============================
const requiredEnv = [
  "PORT",
  "MONGO_URI",
  "JWT_SECRET_KEY",
  "TWILIO_SID",
  "TWILIO_TOKEN",
  "TWILIO_PHONE",
];

requiredEnv.forEach((key) => {

  if (!process.env[key]) {

    console.error(`❌ Missing required env variable: ${key}`);

    process.exit(1);

  }

});


// ==============================
// PORT CONFIG
// ==============================
const PORT = process.env.PORT || 5000;


// ==============================
// CREATE HTTP SERVER
// ==============================
const server = http.createServer(app);


// ==============================
// START SERVER FUNCTION
// ==============================
const startServer = async () => {

  try {

    // connect MongoDB
    await connectDB();

    console.log("✅ MongoDB connected");


    // initialize socket.io
    const io = initSocket(server);

    console.log("✅ Socket.io initialized");


    // start server
    server.listen(PORT, () => {

      console.log(
        `🚀 Server running in ${process.env.NODE_ENV || "development"
        } mode on port ${PORT}`
      );


      // start background jobs
      startSafetyScoreJob();

      console.log("✅ Safety score job started");

    });

  }
  catch (error) {

    console.error("❌ Failed to start server:", error.message);

    process.exit(1);

  }

};


// ==============================
// GRACEFUL SHUTDOWN
// ==============================
const gracefulShutdown = async (signal) => {

  console.log(`🛑 Received ${signal}. Closing server...`);

  server.close(async () => {

    try {

      await mongoose.connection.close();

      console.log("✅ MongoDB connection closed");

      process.exit(0);

    }
    catch (error) {

      console.error("❌ Error closing MongoDB:", error);

      process.exit(1);

    }

  });

};


// shutdown listeners
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);


// ==============================
// START SERVER
// ==============================
// Trigger restart
startServer();
