import { useState, useEffect } from "react";
import axios from "axios";
import GeoFenceMap from "./GeoFenceMap";

export default function GeoFencePage() {
    const [geofences, setGeofences] = useState([]);

    useEffect(() => {
        fetchGeofences();
    }, []);

    const fetchGeofences = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("https://new-women-safety-app.onrender.com/api/geofence", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setGeofences(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch Geofences:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://new-women-safety-app.onrender.com/api/geofence/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchGeofences();
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Secure Geo-Fences</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage active safety boundaries. Alerts trigger unconditionally if breached.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-[#111827] p-2 rounded-xl border border-gray-800 h-[550px] overflow-hidden">
                    <GeoFenceMap geofences={geofences} refresh={fetchGeofences} />
                </div>

                <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 flex flex-col h-[550px]">
                    <h3 className="font-semibold text-lg text-white mb-4">Active Boundaries</h3>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                        {geofences.length === 0 ? (
                            <p className="text-sm text-gray-500 italic text-center mt-10">No geofences created.</p>
                        ) : (
                            geofences.map(gf => (
                                <div key={gf._id} className="bg-gray-800/50 p-4 rounded-lg flex justify-between items-center">
                                    <div>
                                        <h4 className="text-white font-medium">{gf.name}</h4>
                                        <p className="text-xs text-gray-400">Radius: {gf.radius}m</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(gf._id)}
                                        className="text-red-400 hover:text-red-300 text-sm p-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
