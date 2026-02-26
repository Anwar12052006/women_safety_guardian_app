import { useEffect } from "react";
import socket from "../socket";

export const useRealtimeLocation = (user) => {
  useEffect(() => {
    const trackTargetId = user?._id || user?.id;
    if (!trackTargetId) return;

    const watchId = navigator.geolocation.watchPosition((position) => {
      socket.emit("locationUpdate", {
        userId: trackTargetId,
        familyId: user.familyId || trackTargetId,
        location: {
          type: "Point",
          coordinates: [position.coords.longitude, position.coords.latitude],
        },
      });

      console.log("📍 Location sent");
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [user]);
};