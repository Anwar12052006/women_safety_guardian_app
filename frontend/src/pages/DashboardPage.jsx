
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "../hooks/useDashboardData";

import WelcomeSection from "../components/dashboard/WelcomeSection";
import SafetyScoreCard from "../components/dashboard/SafetyScoreCard";
import SOSCard from "../components/dashboard/SOSCard";
import QuickActions from "../components/dashboard/QuickActions";
import MonitoringSection from "../components/dashboard/MonitoringSection";
import ActivitySection from "../components/dashboard/ActivitySection";
import ProfileSummary from "../components/dashboard/ProfileSummary";
import AreaSafetyCard from "../components/dashboard/AreaSafetyCard";
import FeatureCardsSection from "../components/dashboard/FeatureCardsSection";
import { useLiveLocationEmitter } from "../hooks/useLiveLocationEmitter";

const DashboardPage = () => {
  useLiveLocationEmitter();
  const navigate = useNavigate();

  const {
    user,
    safetyScore,
    monitoring,
    activities,
    areaSafety,
    aiInsight,
  } = useDashboardData(navigate);

  // ================= SOS SMS =================
  const sendSOS = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:5000/api/emergency/sos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("SOS SMS sent");
    } catch (error) {
      console.error("SMS Error:", error);
    }
  };

  // ================= HANDLE SOS =================
  const handleSOS = async () => {
    try {
      const token = localStorage.getItem("token");

      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const res = await fetch(
        "http://localhost:5000/api/emergency/trigger",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        // PLAY SIREN LOCALLY FOR USER
        const siren = new Audio("/alert.mp3");
        siren.play().catch(e => console.log("Audio play prevented:", e));

        await sendSOS();
        alert("🚨 SOS sent to family & police!");
      }
    } catch (error) {
      console.error("SOS Error:", error);
    }
  };

  return (
    <>
      <Navbar />

      {/* ================= MAIN CONTAINER ================= */}
      <main className="min-h-[calc(100vh-64px)] bg-slate-950 px-4 sm:px-6 lg:px-10 py-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Welcome */}
          <WelcomeSection user={user} areaSafety={areaSafety} />

          {/* Safety Score + SOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SafetyScoreCard safetyScore={safetyScore} aiInsight={aiInsight} />
            <SOSCard handleSOS={handleSOS} />
          </div>

          {/* Quick Actions */}
          <QuickActions navigate={navigate} />

          {/* Monitoring + Profile */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <MonitoringSection monitoring={monitoring} />
              <ActivitySection activities={activities} />
            </div>

            <div className="space-y-8">
              <ProfileSummary user={user} />
              <AreaSafetyCard areaSafety={areaSafety} />
            </div>
          </div>

          {/* Feature Cards */}
          <FeatureCardsSection />

        </div>
      </main>
    </>
  );
};

export default DashboardPage;