import { useState } from "react";
import axios from "axios";
import { Navigation } from "lucide-react";

export default function TripStarterPanel() {
    const [loading, setLoading] = useState(false);
    const [activeTrip, setActiveTrip] = useState(null);

    const startTrip = async () => {
        setLoading(true);
        try {
            const position = await new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );

            // Simulating a destination 2km away for demo
            const destLat = position.coords.latitude + 0.02;
            const destLng = position.coords.longitude + 0.02;

            const eta = new Date();
            eta.setMinutes(eta.getMinutes() + 30); // 30 min ETA

            const token = localStorage.getItem("token");
            const res = await axios.post(
                "http://localhost:5000/api/trips",
                {
                    startCoordinates: [position.coords.longitude, position.coords.latitude],
                    destinationCoordinates: [destLng, destLat],
                    eta: eta.toISOString(),
                    startAddress: "Current Location",
                    destAddress: "Estimated Destination"
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                setActiveTrip(res.data.data);
            }
        } catch (error) {
            console.error("Failed to start trip", error);
        } finally {
            setLoading(false);
        }
    };

    if (activeTrip && activeTrip.status === "Active") {
        return (
            <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-2xl shadow-md p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-indigo-300 mb-2 tracking-tight flex items-center gap-2">
                        <Navigation className="w-5 h-5 animate-pulse" /> Live Trip Active
                    </h2>
                    <p className="text-sm text-slate-300">
                        Broadcasting ETA to Family Dashboard: <span className="font-mono text-indigo-400">{new Date(activeTrip.eta).toLocaleTimeString()}</span>
                    </p>
                </div>
                <button
                    onClick={() => setActiveTrip(null)}
                    className="mt-6 bg-red-600 hover:bg-red-500 text-white font-medium py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-red-500/20"
                >
                    End Trip Manually
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-md p-6 flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold text-slate-100 mb-3 tracking-tight">
                    Safe Commute
                </h2>
                <p className="text-sm text-slate-400">
                    Start a live monitored trip. Family will see your ETA and route deviations.
                </p>
            </div>
            <button
                onClick={startTrip}
                disabled={loading}
                className="mt-6 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
                {loading ? "Locating..." : "Start Monitored Trip"}
            </button>
        </div>
    );
}
