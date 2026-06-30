
import { Routes, Route } from "react-router-dom";
import FamilyLayout from "../features/family/layout/FamilyLayout";
import FamilyHomePage from "../features/family/dashboard/FamilyHomePage";
import LiveTrackingPage from "../features/family/tracking/LiveTrackingPage";
import AnalyticsPage from "../features/family/analytics/AnalyticsPage";
import SettingsPage from "../features/family/settings/SettingsPage";
import PatrolPage from "../features/family/patrol/PatrolPage";
import IncidentsPage from "../features/family/incidents/IncidentsPage";
import GeoFencePage from "../features/family/geofence/GeoFencePage";
import TripsPage from "../features/family/trips/TripsPage";

export default function FamilyDashboardPage() {
  return (
    <FamilyLayout>
      <Routes>
        <Route path="/" element={<FamilyHomePage />} />
        <Route path="tracking" element={<LiveTrackingPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="trips" element={<TripsPage />} />
        <Route path="geofence" element={<GeoFencePage />} />
        <Route path="patrol" element={<PatrolPage />} />
        <Route path="incidents" element={<IncidentsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </FamilyLayout>
  );
}