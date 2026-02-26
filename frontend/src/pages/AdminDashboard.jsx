import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/layout/AdminNavbar";
import { getAdminStats } from "../services/adminService";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Quick auth check, though the route wrapper should catch it too
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.role !== "admin") {
            navigate("/login");
            return;
        }

        fetchStats();
        // Refresh stats every 30s
        const timer = setInterval(fetchStats, 30000);
        return () => clearInterval(timer);
    }, [navigate]);

    const fetchStats = async () => {
        try {
            const data = await getAdminStats();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (error) {
            console.error("Failed to fetch admin stats", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <AdminNavbar />
                <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xl">
                    Loading Admin Portal...
                </div>
            </>
        );
    }

    return (
        <>
            <AdminNavbar />
            <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto space-y-8">

                    <div className="bg-[#111827] border border-gray-800 p-8 rounded-2xl shadow-xl flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-extrabold text-white">System Overview</h1>
                            <p className="text-gray-400 mt-2 text-sm">Real-time platform usage and emergency statistics.</p>
                        </div>
                        <div className="hidden sm:block">
                            <span className="px-4 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-bold font-mono shadow-lg shadow-green-500/10">ALL SYSTEMS OPERATIONAL</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Users" value={stats?.totalUsers} subtitle="Registered Accounts" color="indigo" />
                        <StatCard title="Active SOS" value={stats?.activeEmergencies} subtitle="Real-time Triggers" color="red" />
                        <StatCard title="Police Officers" value={stats?.policeUsers} subtitle="Verified Authorities" color="blue" />
                        <StatCard title="Pending Reports" value={stats?.pendingIncidents} subtitle="Awaiting Review" color="yellow" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">

                        <div className="bg-[#111827] p-8 border border-gray-800 rounded-2xl shadow-xl hover:shadow-indigo-500/5 transition">
                            <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-800 pb-4">User Demographics</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-gray-800">
                                    <span className="text-gray-400 font-medium">Standard Users</span>
                                    <span className="text-xl font-bold text-white">{stats?.normalUsers || 0}</span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-gray-800">
                                    <span className="text-gray-400 font-medium">Family / Guardians</span>
                                    <span className="text-xl font-bold text-white">{stats?.familyUsers || 0}</span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-gray-800">
                                    <span className="text-gray-400 font-medium">Police / Authorities</span>
                                    <span className="text-xl font-bold text-white">{stats?.policeUsers || 0}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#111827] p-8 border border-gray-800 rounded-2xl shadow-xl hover:shadow-red-500/5 transition">
                            <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-800 pb-4">Incident Volume</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-gray-800">
                                    <span className="text-gray-400 font-medium">Total Lifetime SOS Alerts</span>
                                    <span className="text-xl font-bold text-white">{stats?.totalEmergencies || 0}</span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-gray-800">
                                    <span className="text-gray-400 font-medium">Total Lifetime Incidents</span>
                                    <span className="text-xl font-bold text-white">{stats?.totalIncidents || 0}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

function StatCard({ title, value, subtitle, color }) {
    const colorMap = {
        indigo: "text-indigo-400",
        red: "text-red-500",
        blue: "text-blue-400",
        yellow: "text-yellow-400"
    };

    return (
        <div className="bg-[#111827] p-6 border border-gray-800 rounded-2xl shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
            <div className="mt-4 mb-2">
                <span className={`text-5xl font-extrabold ${colorMap[color] || 'text-white'}`}>{value !== undefined ? value : "—"}</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">{subtitle}</p>
        </div>
    );
}
