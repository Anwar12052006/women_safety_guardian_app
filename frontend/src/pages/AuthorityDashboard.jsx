
import socket from "../socket";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthorityNavbar from "../components/layout/AuthorityNavbar";
import ControlRoomMap from "../components/ControlRoomMap";

export default function AuthorityDashboard() {
  const [stats, setStats] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [patrols, setPatrols] = useState([]);
  const [user, setUser] = useState(null);

  const [alertStatusFilter, setAlertStatusFilter] = useState("ALL");
  const [alertPriorityFilter, setAlertPriorityFilter] = useState("ALL");
  const [alertSearch, setAlertSearch] = useState("");

  const navigate = useNavigate();

  // ================= INITIAL LOAD =================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    fetchStats();
    fetchAlerts();
    fetchIncidents();
    fetchPatrols();

    socket.emit("joinAuthority");

    const interval = setInterval(() => {
      fetchAlerts();
      fetchStats();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // ================= SOCKET LISTENER (ONLY ONE) =================
  useEffect(() => {
    socket.on("newAlert", (alert) => {
      setAlerts((prev) => [alert, ...prev]);

      try {
        const audio = new Audio("/alert.mp3");
        audio.volume = 1;
        audio.play().catch(() => {});
      } catch (err) {}
    });

    socket.on("alertUpdated", (updated) => {
      setAlerts((prev) =>
        prev.map((a) => (a._id === updated._id ? updated : a))
      );
    });

    return () => {
      socket.off("newAlert");
      socket.off("alertUpdated");
    };
  }, []);

  // ================= FETCH FUNCTIONS =================
  const fetchStats = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      "http://localhost:5000/api/authority/stats",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setStats(res.data);
  };

  const fetchAlerts = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      "http://localhost:5000/api/authority/alerts",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setAlerts(Array.isArray(res.data) ? res.data : []);
  };

  const fetchIncidents = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      "http://localhost:5000/api/authority/incidents",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setIncidents(Array.isArray(res.data) ? res.data : []);
  };

  const fetchPatrols = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      "http://localhost:5000/api/patrols",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setPatrols(Array.isArray(res.data) ? res.data : []);
  };

  // ================= ACTIONS =================
  const assignPatrol = async (id) => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/api/authority/assign",
      { alertId: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchAlerts();
    fetchStats();
  };

  const updateIncidentStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await axios.patch(
      `http://localhost:5000/api/authority/incidents/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchIncidents();
    fetchStats();
  };

  // ================= DISTANCE =================
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;

    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const getTimeAgo = (createdAt) => {
    if (!createdAt) return "—";
    const diff = Math.floor((Date.now() - new Date(createdAt)) / 60000);
    if (diff < 1) return "Just now";
    return `Triggered ${diff} min ago`;
  };

  const filteredAlerts = useMemo(() => {
    return alerts
      .filter((a) =>
        alertStatusFilter === "ALL" ? true : a.status === alertStatusFilter
      )
      .filter((a) =>
        alertPriorityFilter === "ALL"
          ? true
          : a.priority === alertPriorityFilter
      )
      .filter((a) =>
        a.user?.name?.toLowerCase().includes(alertSearch.toLowerCase())
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [alerts, alertStatusFilter, alertPriorityFilter, alertSearch]);

  return (
    <>
      <AuthorityNavbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 py-10 px-6 text-white">
        <div className="max-w-6xl mx-auto">

          {/* WELCOME */}
          <div className="bg-white text-black rounded-2xl p-8 mb-10 shadow-xl flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name || "Authority"} 👮‍♂️
              </h1>
              <p className="text-gray-600">
                You are monitoring city safety operations and incident reports.
              </p>
              <p className="text-green-600 font-semibold mt-2">
                Status: ACTIVE MONITORING
              </p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Role: Authority</p>
              <p>System Access: Granted</p>
            </div>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <StatCard title="Active Alerts" value={stats.activeAlerts} color="red" />
            <StatCard title="Available Patrols" value={stats.patrols} color="green" />
            <StatCard title="Pending Reports" value={stats.pendingIncidents} color="yellow" />
          </div>

          {/* MAP */}
          <div className="bg-white p-6 rounded-2xl mb-10">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Live Control Room Map
            </h2>
            <ControlRoomMap
              alerts={alerts.filter(a => a.status === "ACTIVE")}
              incidents={incidents}
              patrols={patrols}
            />
          </div>

          {/* ALERT TABLE */}
          <div className="bg-white text-black p-8 rounded-2xl shadow-xl mb-12">
            <h2 className="text-2xl font-bold mb-6">Live SOS Alerts</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4 text-center">Nearest Patrol (km)</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlerts.map((alert) => {
                    const minutes =
                      alert.createdAt
                        ? (Date.now() - new Date(alert.createdAt)) / 60000
                        : 0;

                    const escalated =
                      minutes > 3 && alert.status === "ACTIVE";

                    const nearest =
                      alert.location?.coordinates && patrols.length > 0
                        ? Math.min(
                            ...patrols.map(p =>
                              calculateDistance(
                                alert.location.coordinates[1],
                                alert.location.coordinates[0],
                                p.location.coordinates[1],
                                p.location.coordinates[0]
                              )
                            )
                          )
                        : "—";

                    return (
                      <tr
                        key={alert._id}
                        className={`border-b ${escalated ? "blink" : ""}`}
                      >
                        <td className="py-3 px-4">{alert.user?.name}</td>
                        <td className="py-3 px-4">
                          {alert.status}
                          {escalated && (
                            <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                              ESCALATED
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">{alert.priority}</td>
                        <td className="py-3 px-4">{getTimeAgo(alert.createdAt)}</td>
                        <td className="py-3 px-4 text-center">{nearest}</td>
                        <td className="py-3 px-4 text-center">
                          {alert.status === "ACTIVE" && (
                            <button
                              onClick={() => assignPatrol(alert._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                            >
                              Assign Patrol
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* INCIDENT TABLE (UNCHANGED) */}
          <div className="bg-white text-black p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6">
              Submitted Incident Reports
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">User</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">View</th>
                    <th className="py-3 px-4 text-center">Severity</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident) => (
                    <tr key={incident._id} className="border-b">
                      <td className="py-3 px-4">{incident.user?.name}</td>
                      <td className="py-3 px-4">{incident.type}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() =>
                            navigate(`/incident/${incident._id}`)
                          }
                          className="bg-indigo-600 text-white px-3 py-1 rounded"
                        >
                          View
                        </button>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {incident.severity}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {incident.status}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <select
                          value={incident.status}
                          onChange={(e) =>
                            updateIncidentStatus(
                              incident._id,
                              e.target.value
                            )
                          }
                          className="border px-3 py-1 rounded"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="UNDER_REVIEW">UNDER REVIEW</option>
                          <option value="RESOLVED">RESOLVED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ================= STAT CARD =================
function StatCard({ title, value, color }) {
  return (
    <div className="bg-white text-black p-8 rounded-2xl shadow-xl">
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className={`text-5xl font-bold mt-4 text-${color}-600`}>
        {value || 0}
      </p>
    </div>
  );
}