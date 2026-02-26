import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/layout/AdminNavbar";
import { getAllAlerts } from "../services/adminService";

export default function AdminAlertsPage() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            const data = await getAllAlerts();
            if (data.success) {
                setAlerts(data.alerts);
            }
        } catch (error) {
            console.error("Failed to fetch alerts", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto space-y-6">

                    <div className="bg-[#111827] border border-gray-800 p-6 rounded-2xl shadow-xl">
                        <h1 className="text-2xl font-bold">Global SOS Alerts</h1>
                        <p className="text-gray-400 text-sm mt-1">Total Lifetime Triggers: {alerts.length}</p>
                    </div>

                    <div className="bg-[#111827] border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        {loading ? (
                            <div className="p-10 text-center text-gray-400">Loading SOS databases...</div>
                        ) : (
                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-slate-900/80 text-gray-300 uppercase text-xs font-semibold tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">SOS ID</th>
                                            <th className="px-6 py-4">Triggered By</th>
                                            <th className="px-6 py-4">Context</th>
                                            <th className="px-6 py-4">Alert Level</th>
                                            <th className="px-6 py-4">Time</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {alerts.map((em) => (
                                            <tr key={em._id} className="hover:bg-slate-900/50 transition-colors duration-200">
                                                <td className="px-6 py-4 font-mono text-gray-400 text-xs">SOS-{em._id.substring(em._id.length - 4).toUpperCase()}</td>
                                                <td className="px-6 py-4 font-medium text-gray-200">
                                                    {em.userId?.name || "Unknown User"}
                                                    <div className="text-xs text-gray-500 font-normal">{em.userId?.email || ""}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-300">{em.message || "Manual SOS Triggered"}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded text-xs font-bold ring-1 ring-inset 
                            ${em.priority === 'CRITICAL' ? 'ring-red-500/50 bg-red-500/20 text-red-400' :
                                                            em.priority === 'HIGH' ? 'ring-orange-500/50 bg-orange-500/20 text-orange-400' :
                                                                'ring-yellow-500/50 bg-yellow-500/20 text-yellow-400'}`}>
                                                        {em.priority}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-400">{new Date(em.createdAt).toLocaleString()}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`flex items-center justify-center gap-1.5 font-bold tracking-wide
                             ${em.status === 'ACTIVE' ? 'text-red-500' : 'text-gray-500'}`}>
                                                        {em.status === 'ACTIVE' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                                                        {em.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {alerts.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No SOS alerts recorded.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
