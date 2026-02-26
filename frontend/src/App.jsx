import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
// import FamilySignupPage from "./pages/FamilySignupPage";
import DashboardPage from "./pages/DashboardPage";
import ReportPage from "./pages/ReportPage";
import TrustedContactsPage
  from "./pages/TrustedContactsPage";
import LiveTrackingPage from "./pages/LiveTrackingPage"
// import ShareLocationPage from "./pages/ShareLocationPage";
import FamilyDashboardPage from "./pages/FamilyDashboardPage";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import AuthorityIncidentDetailsPage from "./pages/AuthorityIncidentDetailsPage";
import ManagePatrolPage from "./pages/ManagePatrolPage.jsx";
import SafeRoutePage from "./pages/SafeRoutePage.jsx";

// Admin Module Pages
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminUsersPage from "./pages/AdminUsersPage.jsx";
import AdminAlertsPage from "./pages/AdminAlertsPage.jsx";
import AdminIncidentsPage from "./pages/AdminIncidentsPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="/family-signup" element={<FamilySignupPage />} /> */}
      <Route path="/dashboard" element={<DashboardPage />} />
      {/* <Route path="/family-dashboard" element={<FamilyDashboardPage />} /> */}
      <Route path="/family-dashboard/*" element={<FamilyDashboardPage />} />
      <Route path="/police-dashboard" element={<AuthorityDashboard />} />
      <Route path="/manage-patrols" element={<ManagePatrolPage />} />

      {/* Admin Central Dashboard */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-users" element={<AdminUsersPage />} />
      <Route path="/admin-alerts" element={<AdminAlertsPage />} />
      <Route path="/admin-incidents" element={<AdminIncidentsPage />} />

      <Route path="/safe-route" element={<SafeRoutePage />} />

      <Route path="/report" element={<ReportPage />} />
      <Route
        path="/trusted-contacts"
        element={<TrustedContactsPage />}
      />
      <Route
        path="/share-location"
        element={<LiveTrackingPage />}
      />
      <Route
        path="/incident/:id"
        element={<AuthorityIncidentDetailsPage />}
      />
      {/* <Route path="/share-location" element={<ShareLocationPage />} /> */}


    </Routes>
  );
}

export default App;

