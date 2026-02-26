import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

const LocationMarker = ({ onSelect }) => {

  const [position, setPosition] = useState(null);

  useMapEvents({

    click(e) {

      const location = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      setPosition(e.latlng);
      onSelect(location);

    },

  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );

};

const MapSelector = ({ onSelect }) => {

  return (

    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={13}
      style={{ height: "300px" }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker onSelect={onSelect} />

    </MapContainer>

  );

};

export default MapSelector;
