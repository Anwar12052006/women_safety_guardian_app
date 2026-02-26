import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function PatrolMap() {
    return (
        <MapContainer
            center={[28.6139, 77.209]}
            zoom={14}
            className="h-full w-full rounded-xl z-0"
        >
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[28.6150, 77.210]}>
                <Popup>Police Unit Alpha-12 active</Popup>
            </Marker>
            <Marker position={[28.6110, 77.200]}>
                <Popup>Police Unit Beta-4 patrolling</Popup>
            </Marker>
        </MapContainer>
    );
}
