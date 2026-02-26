

import { useEffect, useState } from "react";
import socket from "../socket";
import { useRealtimeDashboard } from "./useRealtimeDashboard";
import { useRealtimeLocation } from "./useRealtimeLocation";

export const useDashboardData = (navigate) => {
  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [safetyScore, setSafetyScore] = useState(0);
  const [monitoring, setMonitoring] = useState({});
  const [activities, setActivities] = useState([]);
  const [areaSafety, setAreaSafety] = useState("SAFE");
  const [aiInsight, setAiInsight] = useState("Your current safety level is stable.");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    socket.emit("joinTracking", parsedUser.id);
    socket.emit("joinTracking", parsedUser.id);
    socket.emit("joinGuardianTracking", parsedUser.id);

    fetchDashboard(token);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/location/risk?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await res.json();

        if (data.success) {
          setAreaSafety(data.data.level);
          setSafetyScore(data.data.score);
          if (data.data.insight) setAiInsight(data.data.insight);
        }
      } catch (error) {
        console.error("Location risk fetch error:", error);
      }
    });
  }, [navigate]);

  useRealtimeDashboard(
    user,
    setDashboard,
    setSafetyScore,
    setMonitoring,
    setActivities,
    setAreaSafety
  );

  useRealtimeLocation(user);

  const fetchDashboard = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        setDashboard(data.data);
        setSafetyScore(data.data.safetyScore);
        setMonitoring(data.data.monitoring);
        setActivities(data.data.recentActivity);
        setAreaSafety(data.data.areaSafety);
        if (data.data.aiInsight) setAiInsight(data.data.aiInsight);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  return {
    user,
    dashboard,
    safetyScore,
    monitoring,
    activities,
    areaSafety,
    aiInsight,
  };
};