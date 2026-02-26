import { useState, useEffect } from "react";
import axios from "axios";
import { AlertTriangle } from "lucide-react";

export default function SOSAlertTable() {
    const [emergencies, setEmergencies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmergencies();
    }, []);

    const fetchEmergencies = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/emergency", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setEmergencies(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch SOS emergencies", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-4 text-center text-gray-500">Loading SOS alerts...</div>;
    }

    if (emergencies.length === 0) {
        return null; // Don't show the table if there are no SOS alerts
    }

    return (
        <div className="mb-6 bg-red-950/20 border border-red-500/30 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-red-500/10 px-6 py-3 border-b border-red-500/20 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
                <h3 className="text-red-400 font-bold uppercase tracking-wider text-sm">Active SOS Emergency Targets</h3>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-[#1F2937] text-gray-300 uppercase font-semibold text-xs tracking-wider border-b border-gray-800">
                        <tr>
                            <th className="px-6 py-4">SOS ID</th>
                            <th className="px-6 py-4">Triggered By</th>
                            <th className="px-6 py-4">Context</th>
                            <th className="px-6 py-4">Alert Level</th>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60">
                        {emergencies.map((em) => (
                            <tr key={em._id} className="hover:bg-gray-800/40 transition-colors duration-200 bg-red-500/5">
                                <td className="px-6 py-4 font-mono text-red-400/80">SOS-{em._id.substring(em._id.length - 4).toUpperCase()}</td>
                                <td className="px-6 py-4 font-medium text-gray-200">
                                    {em.userId?.name || "Unknown User"}
                                </td>
                                <td className="px-6 py-4 text-gray-300">{em.message || "Manual SOS Triggered"}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded text-xs font-bold ring-1 ring-inset ring-red-500/50 bg-red-500/20 text-red-400 animate-pulse">
                                        {em.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{new Date(em.createdAt).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className="flex items-center gap-1.5 text-red-500 font-semibold tracking-wide">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                                        {em.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
