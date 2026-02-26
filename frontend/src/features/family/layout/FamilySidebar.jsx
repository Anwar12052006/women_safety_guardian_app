import { NavLink } from "react-router-dom";

export default function FamilySidebar() {
  const linkClass =
    "block px-4 py-3 rounded-lg hover:bg-[#1E293B] transition";

  return (
    <aside className="w-64 hidden md:block bg-[#111827] border-r border-[#1F2937] p-4">
      <h2 className="text-xl font-bold mb-6 text-indigo-400">
        Family Panel
      </h2>

      <nav className="space-y-2">
        <NavLink to="/family-dashboard" end className={linkClass}>Dashboard</NavLink>
        <NavLink to="/family-dashboard/tracking" className={linkClass}>Live Tracking</NavLink>
        <NavLink to="/family-dashboard/trips" className={linkClass}>Trips</NavLink>
        <NavLink to="/family-dashboard/geofence" className={linkClass}>Geo Fence</NavLink>
        <NavLink to="/family-dashboard/incidents" className={linkClass}>Incidents</NavLink>
        <NavLink to="/family-dashboard/patrol" className={linkClass}>Patrol</NavLink>
        <NavLink to="/family-dashboard/analytics" className={linkClass}>Analytics</NavLink>
        <NavLink to="/family-dashboard/settings" className={linkClass}>Settings</NavLink>
      </nav>
    </aside>
  );
}