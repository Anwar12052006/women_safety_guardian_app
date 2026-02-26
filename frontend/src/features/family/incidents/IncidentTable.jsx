import { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle } from "lucide-react";

export default function IncidentTable() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIncidents();
    }, []);

    const fetchIncidents = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("https://new-women-safety-app.onrender.com/api/incidents", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setIncidents(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch incidents", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading incidents...</div>;
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-[#1F2937] text-gray-300 uppercase font-semibold text-xs tracking-wider border-b border-gray-800">
                    <tr>
                        <th className="px-6 py-4">Incident ID</th>
                        <th className="px-6 py-4">Type / Title</th>
                        <th className="px-6 py-4">Risk Level</th>
                        <th className="px-6 py-4">Reported</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                    {incidents.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500 italic">No community incidents reported.</td>
                        </tr>
                    ) : (
                        incidents.map((inc) => (
                            <tr key={inc._id} className="hover:bg-gray-800/40 transition-colors duration-200">
                                <td className="px-6 py-4 font-mono text-indigo-400/80">INC-{inc._id.substring(inc._id.length - 4).toUpperCase()}</td>
                                <td className="px-6 py-4 font-medium text-gray-200 flex items-center gap-2 capitalize">
                                    {inc.priority === "CRITICAL" && <AlertCircle className="w-4 h-4 text-red-500" />}
                                    {inc.type}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded text-xs font-bold border ${(inc.priority || '').includes('CRITICAL') || (inc.priority || '').includes('HIGH') ? 'bg-red-500/10 text-red-400 border-red-500/20' : (inc.priority || '') === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                                        {inc.priority || "LOW"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{new Date(inc.createdAt || inc.reportedAt).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center gap-1.5 ${inc.status === "RESOLVED" ? "text-green-500" : inc.status === "UNDER_REVIEW" ? "text-yellow-500" : "text-gray-400"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${inc.status === "RESOLVED" ? "bg-green-500" : inc.status === "UNDER_REVIEW" ? "bg-yellow-500" : "bg-gray-400"}`}></span>
                                        {inc.status || "PENDING"}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
