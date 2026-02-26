import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 🔥 Recenter component
function RecenterMap({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView(location, 16);
    }
  }, [location, map]);

  return null;
}

export default function LiveMap({ location }) {
  return (
    <MapContainer
      center={location}
      zoom={16}
      scrollWheelZoom={true}
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={location}>
        <Popup>User Live Location</Popup>
      </Marker>

      {/* 🔥 Auto Recenter */}
      <RecenterMap location={location} />
    </MapContainer>
  );
}