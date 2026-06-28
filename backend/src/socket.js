

import { Server } from "socket.io";
import User from "./models/User.js";

let io = null;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://women-safety-proj.onrender.com",
      ],
      methods: ["GET", "POST", "PATCH"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);

    // ===============================
    // AUTHORITY ROOM
    // ===============================
    socket.on("joinAuthority", () => {
      socket.join("authority:control");
      console.log("👮 Authority joined control room");
    });

    // ===============================
    // USER DASHBOARD ROOM
    // ===============================
    socket.on("joinDashboard", (userId) => {
      if (!userId) return;
      socket.join(`dashboard:${userId}`);
      console.log("📊 Joined dashboard room:", userId);
    });

    // ===============================
    // USER TRACKING ROOM
    // ===============================
    socket.on("joinTracking", (userId) => {
      if (!userId) return;
      socket.join(`tracking:${userId}`);
      console.log("👤 Joined tracking room:", userId);
    });

    // ===============================
    // FAMILY TRACKING ROOM
    // ===============================
    socket.on("joinFamilyTracking", (familyId) => {
      if (!familyId) return;
      socket.join(`family:${familyId}`);
      console.log("👨‍👩‍👧 Family joined room:", familyId);
    });

    // ===============================
    // LOCATION UPDATE
    // ===============================
    socket.on("locationUpdate", async (data) => {
      try {
        const { userId, location } = data;

        if (!userId || !location) {
          console.log("❌ Missing location data");
          return;
        }

        const user = await User.findById(userId);

        if (!user) {
          console.log("❌ User not found");
          return;
        }

        const payload = {
          userId,
          location,
          timestamp: new Date(),
        };

        // Send to user's own tracking room
        io.to(`tracking:${userId}`).emit("trackUserLocation", payload);

        const familyMembers = await User.find({ owner: userId }).select("_id");

        familyMembers.forEach((member) => {
          const roomId = member._id.toString();   // 🔥 IMPORTANT
          console.log("📡 Emitting to:", `family:${roomId}`);

          const familyPayload = { ...payload, familyId: roomId };

          io.to(`family:${roomId}`).emit(
            "familyTrackLocation",
            familyPayload
          );

          io.to(`tracking:${userId}`).emit(
            "familyTrackLocation",
            familyPayload
          );
        });

        console.log("📍 Location broadcasted:", payload.location);
      } catch (error) {
        console.error("Socket location error:", error.message);
      }
    });

    // ===============================
    // DISCONNECT
    // ===============================
    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};