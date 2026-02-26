import { useEffect, useState } from "react";
import axios from "axios";
import TripMonitorPanel from "./TripMonitorPanel";

export default function TripsPage() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/trips", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setTrips(res.data.data);
            }
        } catch (error) {
            console.error("Fetch trips error", error);
        }
    };

    const endTrip = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(`http://localhost:5000/api/trips/${id}/end`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTrips();
        } catch (error) {
            console.error("End trip failed", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Live Trips Dispatch</h2>
                    <p className="text-gray-400 text-sm mt-1">Monitor ETA deviations, strict pathway tracking, and automated check-ins.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    {/* We grab the most recent active trip to monitor live on the Map */}
                    <TripMonitorPanel activeTrip={trips.find(t => t.status === "Active")} />
                </div>

                <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 flex flex-col h-[550px]">
                    <h3 className="font-semibold text-lg text-white mb-4">Trip History</h3>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                        {trips.length === 0 ? (
                            <p className="text-sm text-gray-500 italic text-center mt-10">No active or historical trips mapped.</p>
                        ) : (
                            trips.map(trip => (
                                <div key={trip._id} className="bg-gray-800/50 p-4 rounded-lg flex flex-col justify-between border border-gray-700">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${trip.status === 'Active' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : trip.status === 'SOS' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                                            {trip.status}
                                        </span>
                                        <span className="text-xs text-gray-400 font-mono">
                                            {new Date(trip.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-white text-sm mt-1"><span className="text-gray-400">Src:</span> {trip.startLocation.address || 'GPS Coordinates'}</p>
                                    <p className="text-white text-sm"><span className="text-gray-400">Dst:</span> {trip.destination.address || 'GPS Coordinates'}</p>

                                    {trip.status === "Active" && (
                                        <button
                                            onClick={() => endTrip(trip._id)}
                                            className="mt-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium py-1.5 rounded border border-red-500/20 transition-colors"
                                        >
                                            Force Complete Trip
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
