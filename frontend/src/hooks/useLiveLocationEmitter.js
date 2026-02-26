import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const useLiveLocationEmitter = () => {

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    if (!navigator.geolocation) return;

    // Join user tracking room
    socket.emit("joinTracking", userId);

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        console.log("📡 Sending location:", latitude, longitude);

        socket.emit("locationUpdate", {
          userId,
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        });
      },
      (error) => {
        console.error("GPS Error:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };

  }, []);
};