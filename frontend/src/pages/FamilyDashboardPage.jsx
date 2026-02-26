// import React from "react";

// import UserOverviewCard from "../components/family/UserOverviewCard";
// import LiveMapCard from "../components/family/LiveMapCard";
// import EmergencyPanel from "../components/family/EmergencyPanel";
// import QuickActions from "../components/family/QuickActions";
// import ActivityTimeline from "../components/family/ActivityTimeline";
// import LocationHistory from "../components/family/LocationHistory";
// import TrackingStatus from "../components/family/TrackingStatus";

// export default function FamilyDashboardPage() {

//   return (
//     <div className="min-h-screen bg-slate-900 text-white p-4">

//       {/* Header */}
//       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400 mb-4">
//         Family Safety Dashboard
//       </h1>

//       {/* Responsive Grid */}
//       <div className="
//         grid gap-4

//         grid-cols-1
//         md:grid-cols-2
//         xl:grid-cols-4
//       ">

//         {/* Overview */}
//         <UserOverviewCard />

//         {/* Map */}
//         <div className="md:col-span-2 xl:col-span-2">
//           <LiveMapCard />
//         </div>

//         {/* Emergency */}
//         <EmergencyPanel />

//         {/* Quick Actions full width */}
//         <div className="col-span-full">
//           <QuickActions />
//         </div>

//         {/* Timeline */}
//         <ActivityTimeline />

//         {/* Location History */}
//         <LocationHistory />

//         {/* Tracking Status */}
//         <TrackingStatus />

//       </div>

//     </div>
//   );
// }





// import React from "react";

// import UserOverviewCard from "../components/family/UserOverviewCard";
// import LiveMapCard from "../components/family/LiveMapCard";
// import EmergencyPanel from "../components/family/EmergencyPanel";
// import QuickActions from "../components/family/QuickActions";
// import ActivityTimeline from "../components/family/ActivityTimeline";
// import LocationHistory from "../components/family/LocationHistory";
// import TrackingStatus from "../components/family/TrackingStatus";

// export default function FamilyDashboardPage() {

//   return (
//     <div className="
//       min-h-screen
//       bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700
//       px-4 sm:px-6 lg:px-10
//       py-6
//     ">

//       {/* Container */}
//       <div className="max-w-7xl mx-auto">

//         {/* Header Card */}
//         <div className="
//           bg-white
//           rounded-2xl
//           shadow-xl
//           p-5 sm:p-6
//           mb-6
//         ">
//           <h1 className="
//             text-xl
//             sm:text-2xl
//             md:text-3xl
//             font-bold
//             text-indigo-900
//           ">
//             Family Safety Dashboard
//           </h1>
//         </div>

//         {/* Responsive Grid */}
//         <div
//           className="
//           grid gap-6

//           grid-cols-1
//           md:grid-cols-2
//           xl:grid-cols-4
//         "
//         >

//           {/* Overview */}
//           <UserOverviewCard />

//           {/* Map */}
//           <div className="md:col-span-2 xl:col-span-2">
//             <LiveMapCard />
//           </div>

//           {/* Emergency */}
//           <EmergencyPanel />

//           {/* Quick Actions full width */}
//           <div className="col-span-full">
//             <QuickActions />
//           </div>

//           {/* Timeline */}
//           <ActivityTimeline />

//           {/* Location History */}
//           <LocationHistory />

//           {/* Tracking Status */}
//           <TrackingStatus />

//         </div>

//       </div>

//     </div>
//   );
// }










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