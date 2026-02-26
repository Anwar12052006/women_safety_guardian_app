import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Navigation } from "lucide-react";

export default function TripMonitorPanel({ activeTrip }) {
    if (!activeTrip) {
        return (
            <div className="bg-[#111827] flex flex-col items-center justify-center p-6 rounded-xl border border-gray-800 h-[550px] text-gray-500">
                <Navigation className="w-12 h-12 mb-3 opacity-20" />
                <p>No active trips are currently broadcasting.</p>
            </div>
        );
    }

    // GeoJSON uses [lng, lat], Leaflet uses [lat, lng]
    const startLoc = [activeTrip.startLocation.coordinates[1], activeTrip.startLocation.coordinates[0]];
    const destLoc = [activeTrip.destination.coordinates[1], activeTrip.destination.coordinates[0]];

    // Draw the straight-line theoretical path vs the active breadcrumbs
    const routeLine = [startLoc, destLoc];

    return (
        <div className="bg-[#111827] p-2 rounded-xl border border-gray-800 h-[550px] relative overflow-hidden">
            <div className="absolute top-4 right-4 z-[1000] bg-gray-900 border border-indigo-500/50 px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md">
                <p className="text-indigo-400 font-bold text-sm tracking-wider">LIVE 📡</p>
                <p className="text-xs text-gray-300 mt-1">ETA: {new Date(activeTrip.eta).toLocaleTimeString()}</p>
            </div>

            <MapContainer center={startLoc} zoom={13} className="h-full w-full rounded-lg z-0">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker position={startLoc}>
                    <Popup>Start: {activeTrip.startLocation.address || 'Origin'}</Popup>
                </Marker>

                <Marker position={destLoc}>
                    <Popup>Destination: {activeTrip.destination.address || 'End Station'}</Popup>
                </Marker>

                <Polyline positions={routeLine} color="rgba(99, 102, 241, 0.8)" dashArray="5, 10" weight={3} />
            </MapContainer>
        </div>
    );
}
