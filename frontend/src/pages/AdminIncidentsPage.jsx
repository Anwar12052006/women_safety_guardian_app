import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/layout/AdminNavbar";
import { getAllIncidents } from "../services/adminService";

export default function AdminIncidentsPage() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIncidents();
    }, []);

    const fetchIncidents = async () => {
        try {
            const data = await getAllIncidents();
            if (data.success) {
                setIncidents(data.incidents);
            }
        } catch (error) {
            console.error("Failed to fetch incidents", error);
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
                        <h1 className="text-2xl font-bold">Community Incidents</h1>
                        <p className="text-gray-400 text-sm mt-1">Total Lifetime Reports: {incidents.length}</p>
                    </div>

                    <div className="bg-[#111827] border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        {loading ? (
                            <div className="p-10 text-center text-gray-400">Loading incident database...</div>
                        ) : (
                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-slate-900/80 text-gray-300 uppercase text-xs font-semibold tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Incident ID</th>
                                            <th className="px-6 py-4">Type / Title</th>
                                            <th className="px-6 py-4">Reported By</th>
                                            <th className="px-6 py-4 text-center">Severity</th>
                                            <th className="px-6 py-4">Time</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {incidents.map((incident) => (
                                            <tr key={incident._id} className="hover:bg-slate-900/50 transition-colors duration-200">
                                                <td className="px-6 py-4 font-mono text-gray-400 text-xs">INC-{incident._id.substring(incident._id.length - 4).toUpperCase()}</td>
                                                <td className="px-6 py-4 font-bold text-gray-200 capitalize">{incident.type || "Other"}</td>
                                                <td className="px-6 py-4 text-gray-300">
                                                    {incident.user?.name || "Anonymous User"}
                                                    <div className="text-xs text-gray-500 font-normal">{incident.user?.email || ""}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2.5 py-1 rounded text-xs font-bold ring-1 ring-inset 
                            ${incident.severity >= 4 ? 'ring-red-500/50 bg-red-500/20 text-red-400' :
                                                            incident.severity === 3 ? 'ring-yellow-500/50 bg-yellow-500/20 text-yellow-400' :
                                                                'ring-green-500/50 bg-green-500/20 text-green-400'}`}>
                                                        {incident.severity >= 4 ? "HIGH" : incident.severity === 3 ? "MEDIUM" : "LOW"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-400">{new Date(incident.createdAt).toLocaleString()}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`flex items-center justify-center gap-1.5 font-bold tracking-wide uppercase text-[10px]
                             ${incident.status === 'UNDER_REVIEW' ? 'text-yellow-500' :
                                                            incident.status === 'PENDING' ? 'text-gray-400' :
                                                                incident.status === 'RESOLVED' ? 'text-green-500' : 'text-red-500'}`}>
                                                        {incident.status === 'UNDER_REVIEW' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>}
                                                        {incident.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {incidents.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No community incidents recorded.</td>
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
