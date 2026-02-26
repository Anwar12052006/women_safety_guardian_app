
// import { Server } from "socket.io";
// import User from "./models/User.js";

// let io = null;

// export const initSocket = (server) => {

//   io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST", "PATCH"],
//       credentials: true,
//     },
//   });

//   io.on("connection", (socket) => {

//     console.log("🔌 User connected:", socket.id);

//     // =================================
//     // 🔥 AUTHORITY CONTROL ROOM
//     // =================================
//     socket.on("joinAuthority", () => {

//       const room = "authority:control";

//       socket.join(room);

//       console.log("👮 Authority joined control room");

//     });

//     // =================================
//     // USER DASHBOARD ROOM
//     // =================================
//     socket.on("joinDashboard", (userId) => {

//       if (!userId)
//       {
//         console.log("❌ No userId for dashboard");
//         return;
//       }

//       const room = `dashboard:${userId}`;

//       socket.join(room);

//       console.log("📊 Joined dashboard room:", room);

//     });

//     // =================================
//     // USER TRACKING ROOM
//     // =================================
//     socket.on("joinTracking", (userId) => {

//       if (!userId)
//       {
//         console.log("❌ No userId for tracking");
//         return;
//       }

//       const room = `tracking:${userId}`;

//       socket.join(room);

//       console.log("👤 Joined tracking room:", room);

//     });

//     // =================================
//     // FAMILY TRACKING ROOM
//     // =================================
//     socket.on("joinFamilyTracking", (familyId) => {

//       if (!familyId)
//       {
//         console.log("❌ No familyId found");
//         return;
//       }

//       const room = `family:${familyId}`;

//       socket.join(room);

//       console.log("👨‍👩‍👧 Family joined room:", room);

//     });

//     // =================================
//     // 🔥 BROADCAST NEW SOS TO AUTHORITY
//     // =================================
//     socket.on("broadcastNewAlert", (alertData) => {

//       if (!alertData)
//       {
//         console.log("❌ No alert data to broadcast");
//         return;
//       }

//       io.to("authority:control").emit("newAlert", alertData);

//       console.log("🚨 New SOS sent to authority room");

//     });

//     // =================================
//     // 🔥 BROADCAST ALERT STATUS UPDATE
//     // =================================
//     socket.on("broadcastAlertUpdate", (alertData) => {

//       if (!alertData)
//       {
//         console.log("❌ No alert update data");
//         return;
//       }

//       io.to("authority:control").emit("alertUpdated", alertData);

//       console.log("🔄 Alert update sent to authority room");

//     });

//     // =================================
//     // LOCATION UPDATE EVENT
//     // =================================
//     socket.on("locationUpdate", async (data) => {

//       try {

//         if (!data)
//         {
//           console.log("❌ No location data");
//           return;
//         }

//         const { userId, location } = data;

//         if (!userId || !location)
//         {
//           console.log("❌ Missing userId or location");
//           return;
//         }

//         const user = await User.findById(userId).select("familyId");

//         const familyId = user?.familyId;

//         const payload = {
//           userId,
//           familyId,
//           location,
//           timestamp: new Date()
//         };

//         const trackingRoom = `tracking:${userId}`;

//         io.to(trackingRoom).emit(
//           "trackUserLocation",
//           payload
//         );

//         console.log("📍 Sent to:", trackingRoom);

//         if (familyId)
//         {
//           const familyRoom = `family:${familyId}`;

//           io.to(familyRoom).emit(
//             "familyTrackLocation",
//             payload
//           );

//           console.log("👨‍👩‍👧 Sent to:", familyRoom);
//         }
//         else
//         {
//           console.log("❌ No familyId found in DB");
//         }

//       }
//       catch (error)
//       {
//         console.error("Socket location error:", error);
//       }

//     });

//     // =================================
//     // DISCONNECT
//     // =================================
//     socket.on("disconnect", () => {

//       console.log("❌ User disconnected:", socket.id);

//     });

//   });

//   return io;

// };

// export const getIO = () => {

//   if (!io)
//   {
//     throw new Error("Socket.io not initialized");
//   }

//   return io;

// };


import { Server } from "socket.io";
import User from "./models/User.js";

let io = null;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
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