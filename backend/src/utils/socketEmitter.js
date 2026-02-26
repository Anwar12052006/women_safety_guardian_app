

import { getIO } from "../socket.js";


/**
 * Emit dashboard update to specific user
 */
export const emitDashboardUpdate = (userId, data) =>
{
  try
  {
    const io = getIO();

    const room = `dashboard:${userId}`;

    io.to(room).emit(
      "dashboard:update",
      data
    );

    console.log(`📊 Dashboard update sent → ${room}`);

  }
  catch (error)
  {
    console.error("❌ Dashboard emit error:", error);
  }
};




/**
 * Emit realtime location update
 * to both user tracking and family dashboard
 */
export const emitLocationUpdate =
(
  userId,
  familyId,
  location
) =>
{
  try
  {
    const io = getIO();

    if (!io)
    {
      console.error("❌ Socket IO not initialized");
      return;
    }


    // ✅ FORCE STRING conversion (CRITICAL FIX)
    const payload =
    {
      userId: userId?.toString(),
      familyId: familyId?.toString(),
      location,
      timestamp: new Date()
    };


    // ✅ emit to user's own tracking dashboard
    const trackingRoom =
      `tracking:${payload.userId}`;

    io.to(trackingRoom).emit(
      "trackUserLocation",
      payload
    );

    console.log(
      `📍 Location sent → ${trackingRoom}`
    );



    // ✅ emit to family dashboard
    if (payload.familyId)
    {
      const familyRoom =
        `family:${payload.familyId}`;

      io.to(familyRoom).emit(
        "familyTrackLocation",
        payload
      );

      console.log(
        `👨‍👩‍👧 Location sent → ${familyRoom}`
      );
    }
    else
    {
      console.warn(
        "⚠️ No familyId provided, skipping family emit"
      );
    }


  }
  catch (error)
  {
    console.error(
      "❌ Location emit error:",
      error
    );
  }
};
