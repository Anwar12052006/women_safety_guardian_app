import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ControlRoomMap({ alerts, incidents, patrols }) {
  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {alerts.map((alert) => {
        if (!alert.location?.coordinates) return null;
        const [lng, lat] = alert.location.coordinates;
        return (
          <Marker key={alert._id} position={[lat, lng]}>
            <Popup>
              🔴 SOS Alert <br />
              {alert.user?.name}
            </Popup>
          </Marker>
        );
      })}

      {incidents.map((incident) => {
        if (!incident.location?.coordinates) return null;
        const [lng, lat] = incident.location.coordinates;
        return (
          <Marker key={incident._id} position={[lat, lng]}>
            <Popup>
              🟡 Incident <br />
              {incident.user?.name}
            </Popup>
          </Marker>
        );
      })}

      {patrols.map((patrol) => {
        if (!patrol.location?.coordinates) return null;
        const [lng, lat] = patrol.location.coordinates;
        return (
          <Marker key={patrol._id} position={[lat, lng]}>
            <Popup>
              🔵 Patrol <br />
              {patrol.officerName}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}