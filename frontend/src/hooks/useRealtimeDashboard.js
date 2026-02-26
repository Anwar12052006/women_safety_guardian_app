import { useEffect } from "react";
import socket from "../socket";

export const useRealtimeDashboard = (
  user,
  setDashboard,
  setSafetyScore,
  setMonitoring,
  setActivities,
  setAreaSafety
) => {
  useEffect(() => {
    if (!user?.id) return;

    socket.emit("joinDashboard", user.id);

    const dashboardHandler = (dashboardData) => {
      setDashboard(dashboardData);
      setSafetyScore(dashboardData.safetyScore);
      setMonitoring(dashboardData.monitoring);
      setActivities(dashboardData.recentActivity);
      setAreaSafety(dashboardData.areaSafety);
    };

    const emergencyHandler = (emergency) => {
      alert(`🚨 Emergency Triggered!\nPriority: ${emergency.priority}`);
    };

    socket.on(`dashboard:${user.id}`, dashboardHandler);
    socket.on("emergencyAlert", emergencyHandler);

    return () => {
      socket.off(`dashboard:${user.id}`, dashboardHandler);
      socket.off("emergencyAlert", emergencyHandler);
    };
  }, [user]);
};