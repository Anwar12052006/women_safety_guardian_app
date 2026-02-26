import { useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup, useMapEvents } from "react-leaflet";
import axios from "axios";

// Interactor Component to capture map clicks for new Geofences
function LocationFinder({ onLocationFound }) {
    useMapEvents({
        click(e) {
            onLocationFound(e.latlng);
        },
    });
    return null;
}

export default function GeoFenceMap({ geofences, refresh }) {
    const [newZone, setNewZone] = useState(null);
    const [zoneName, setZoneName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleMapClick = (latlng) => {
        setNewZone(latlng);
    };

    const handleSave = async () => {
        if (!zoneName || !newZone) return;
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/geofence", {
                name: zoneName,
                coordinates: [newZone.lng, newZone.lat], // GeoJSON order
                radius: 500
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewZone(null);
            setZoneName("");
            refresh();
        } catch (error) {
            console.error("Save failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-full w-full">
            <MapContainer center={[28.6139, 77.209]} zoom={13} className="h-full w-full rounded-lg z-0">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationFinder onLocationFound={handleMapClick} />

                {/* Render Saved Fences */}
                {geofences.map(gf => (
                    <Circle
                        key={gf._id}
                        center={[gf.location.coordinates[1], gf.location.coordinates[0]]}
                        radius={gf.radius}
                        pathOptions={{ color: 'rgba(99, 102, 241, 0.6)', fillColor: 'rgba(99, 102, 241, 0.2)' }}
                    >
                        <Popup>{gf.name} (Active)</Popup>
                    </Circle>
                ))}

                {/* Render New Draft Fence */}
                {newZone && (
                    <Circle
                        center={[newZone.lat, newZone.lng]}
                        radius={500}
                        pathOptions={{ color: 'rgba(34, 197, 94, 0.8)', fillColor: 'rgba(34, 197, 94, 0.4)' }}
                    />
                )}
            </MapContainer>

            {/* Draft Zone Creation Panel overlay */}
            {newZone && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-gray-900 border border-indigo-500/50 p-4 rounded-xl shadow-2xl flex gap-3 items-center backdrop-blur-md">
                    <input
                        type="text"
                        placeholder="Zone Name (e.g. Campus)"
                        value={zoneName}
                        onChange={e => setZoneName(e.target.value)}
                        className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                        onClick={handleSave}
                        disabled={loading || !zoneName}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                        Save Zone
                    </button>
                    <button
                        onClick={() => setNewZone(null)}
                        className="text-gray-400 hover:text-white px-2 py-2"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}
