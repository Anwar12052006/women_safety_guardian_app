import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LiveMap from "./LiveMap";
import TrackingStatusCard from "./TrackingStatusCard";
import BatteryNetworkStatus from "./BatteryNetworkStatus";
import TrackingTransparencyBanner from "./TrackingTransparencyBanner";
import TrackingLogPanel from "./TrackingLogPanel";

const socket = io("https://new-women-safety-app.onrender.com");

export default function LiveTrackingPage() {
  const [location, setLocation] = useState([28.6139, 77.209]);
  const [isTracking] = useState(true);

  //   const familyId = localStorage.getItem("familyId");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  // const familyRoomId = user?.id;   // THIS IS IMPORTANT
  const familyRoomId = user?._id || localStorage.getItem("familyId");

  useEffect(() => {
    if (!familyRoomId) {
      console.log("❌ No familyId found in localStorage");
      return;
    }

    // Join family tracking room
    socket.emit("joinFamilyTracking", familyRoomId);

    console.log("👨‍👩‍👧 Joined family room:", familyRoomId);

    // Listen for location updates
    socket.on("familyTrackLocation", (data) => {
      console.log("📡 Received from backend:", data);

      if (data?.location?.coordinates) {
        setLocation([
          data.location.coordinates[1],
          data.location.coordinates[0],
        ]);
      }
    });

    return () => {
      socket.off("familyTrackLocation");
    };
  }, [familyRoomId]);

  return (
    <div className="space-y-6">
      <TrackingTransparencyBanner isTracking={isTracking} />

      <div className="bg-[#111827] p-4 rounded-xl h-[450px]">
        <LiveMap location={location} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <TrackingStatusCard />
        <BatteryNetworkStatus />
        <TrackingLogPanel />
      </div>
    </div>
  );
}