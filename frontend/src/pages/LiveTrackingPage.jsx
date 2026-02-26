
import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import socket from "../socket";
import axios from "axios";
import { MapPin, Users, Shield } from "lucide-react";

export default function LiveTrackingPage() {
  const [location, setLocation] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [trackingUsers, setTrackingUsers] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    fetchContacts();

    if (user?._id) {
      socket.emit("joinTracking", user._id);
    }

    startTracking();

    socket.on("familyTrackLocation", (data) => {
      setTrackingUsers((prev) => {
        const exists = prev.find(
          (u) => u.familyId === data.familyId
        );

        if (exists) {
          return prev.map((u) =>
            u.familyId === data.familyId ? data : u
          );
        }

        return [...prev, data];
      });
    });


    return () => {
      socket.off("familyTrackLocation");

    };

  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        "https://new-women-safety-app.onrender.com/api/trusted-contacts",
        {
          headers:
          {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContacts(res.data.data);

    }
    catch (err) {
      console.error(err);
    }
  };

  const startTracking = () => {
    navigator.geolocation.watchPosition(
      (pos) => {
        const loc =
        {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setLocation(loc);


        const familyId = user?.familyId;

        // socket.emit("locationUpdate", {
        //   userId: user._id,
        //   familyId,
        //   location: {
        //     type: "Point",
        //     coordinates: [loc.lng, loc.lat], // IMPORTANT ORDER
        //   },
        //   timestamp: new Date(),
        // });
        // Let Socket.IO queue the event if reconnecting instead of dropping it
        socket.emit("locationUpdate", {
          userId: user._id,
          location: {
            type: "Point",
            coordinates: [loc.lng, loc.lat],
          },
        });

      },
      (err) => {
        console.error(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  };

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-slate-950 px-4 py-6 sm:px-10 sm:py-10">

        <div className="max-w-6xl mx-auto space-y-6">

          {/* HEADER */}
          <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <MapPin className="text-indigo-400 w-6 h-6" />

              <div>

                <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Live Location Sharing
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Your guardians can track you in realtime
                </p>

              </div>

            </div>

            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              ACTIVE
            </span>

          </div>


          {/* CURRENT LOCATION */}
          <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">

            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Shield className="text-indigo-400 w-5 h-5" />
              Your Current Location
            </h3>

            {location ? (
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col gap-2">

                <p className="text-sm text-slate-300">
                  <span className="text-slate-500">Latitude:</span> {location.lat}
                </p>

                <p className="text-sm text-slate-300">
                  <span className="text-slate-500">Longitude:</span> {location.lng}
                </p>

                <a
                  href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
                  target="_blank"
                  className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors mt-2"
                >
                  Open in Google Maps
                </a>

              </div>
            ) : (
              <p className="text-slate-400 text-sm italic bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                Getting your location...
              </p>
            )}

          </div>


          {/* CONTACTS TRACKING STATUS */}
          <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">

            <h3 className="font-semibold text-slate-100 mb-5 flex items-center gap-2">
              <Users className="text-indigo-400 w-5 h-5" />
              Tracking Status
            </h3>

            {contacts.length === 0 ? (
              <p className="text-slate-400 text-sm italic bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                No trusted contacts added
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {contacts.map((contact) => {
                  // Safety checks for nested populated User document
                  const trackTargetId = contact.contact?._id || contact._id;

                  const isTracking = trackingUsers.some(
                    (u) => u.familyId === trackTargetId.toString()
                  );

                  return (
                    <div
                      key={contact._id}
                      className="bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors p-4 rounded-xl flex justify-between items-center"
                    >

                      <div>

                        <p className="font-semibold text-slate-200">
                          {contact.contact?.name || contact.contactEmail || contact.name}
                        </p>

                        <p className="text-sm text-slate-500 mt-0.5">
                          {contact.relation}
                        </p>

                      </div>

                      <span
                        className={`text-xs font-medium tracking-wide px-3 py-1 rounded-full border ${isTracking
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          }`}
                      >
                        {isTracking
                          ? "Tracking"
                          : "Not tracking"}
                      </span>

                    </div>
                  );
                })}

              </div>
            )}

          </div>

        </div>

      </main>
    </>
  );
}

