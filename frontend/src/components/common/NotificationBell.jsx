import { useEffect, useState } from "react";
import socket from "../../socket";

const NotificationBell = ({ userId }) => {

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {

    if (!userId) return;

    console.log("Listening notifications for user:", userId);

    // Listen realtime notifications
    socket.on(`notification:${userId}`, (notification) => {

      console.log("New notification:", notification);

      // Trigger the DOM audio
      const siren = document.getElementById("emergency-siren");
      if (siren) {
        siren.volume = 1.0;
        siren.play().catch(e => console.log("Audio play prevented by browser policy:", e));
      }

      setNotifications((prev) => [
        notification,
        ...prev,
      ]);

    });

    // Listen for manual SOS Emergency alerts
    socket.on("emergencyAlert", (alertData) => {
      console.log("CRITICAL SOS ALERT:", alertData);

      // Trigger the hidden DOM Audio element
      const siren = document.getElementById("emergency-siren");
      if (siren) {
        siren.volume = 1.0;
        siren.play().catch(e => console.log("Audio play prevented:", e));
      }

      setNotifications((prev) => [
        {
          _id: Date.now().toString(),
          title: "🚨 ACTIVE EMERGENCY SOS",
          message: alertData.message || "Manual SOS triggered",
          priority: "CRITICAL"
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off(`notification:${userId}`);
      socket.off("emergencyAlert");
    };

  }, [userId]);



  return (

    <div className="relative">
      {/* Hidden audio element to bypass strict browser autoplay limits */}
      <audio id="emergency-siren" src="/alert.mp3" preload="auto"></audio>

      {/* Bell icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative text-white text-xl"
      >
        🔔

        {/* Badge count */}
        {notifications.length > 0 && (

          <span className="
            absolute -top-2 -right-2
            bg-red-500 text-white text-xs
            px-2 py-0.5 rounded-full
          ">
            {notifications.length}
          </span>

        )}

      </button>



      {/* Dropdown */}
      {open && (

        <div className="
          absolute right-0 mt-2 w-72
          bg-white shadow-lg rounded-xl
          p-3 z-50
        ">

          <h3 className="font-bold mb-2 text-indigo-900">
            Notifications
          </h3>

          {notifications.length === 0 ? (

            <p className="text-sm text-gray-500">
              No notifications
            </p>

          ) : (

            notifications.map((n) => (

              <div
                key={n._id}
                className="
                  p-2 mb-2
                  bg-indigo-50
                  rounded-lg
                  text-sm
                "
              >

                <p className="font-semibold">
                  {n.title}
                </p>

                <p className="text-gray-600 text-xs">
                  {n.message}
                </p>

              </div>

            ))

          )}

        </div>

      )}

    </div>

  );

};

export default NotificationBell;
