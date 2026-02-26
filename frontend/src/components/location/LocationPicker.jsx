import { useState, useEffect } from "react";
import MapSelector from "./MapSelector";

const LocationPicker = ({ onLocationSelect }) => {

  const [method, setMethod] = useState("auto");
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);

  // Auto detect location
  useEffect(() => {

    if (method === "auto") {

      navigator.geolocation.getCurrentPosition(
        (pos) => {

          const location = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          setCoords(location);
          onLocationSelect(location);

        },
        (err) => {
          console.error(err);
        }
      );

    }

  }, [method]);

  // Manual city input
  const handleCitySubmit = () => {

    if (!city) return;

    onLocationSelect({
      city,
    });

  };

  return (

    <div>

      <h4>Select Location Method</h4>

      <label>
        <input
          type="radio"
          value="auto"
          checked={method === "auto"}
          onChange={() => setMethod("auto")}
        />
        Use Current Location
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="map"
          checked={method === "map"}
          onChange={() => setMethod("map")}
        />
        Select on Map
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="city"
          checked={method === "city"}
          onChange={() => setMethod("city")}
        />
        Enter City
      </label>

      {/* Map selector */}
      {method === "map" && (
        <MapSelector
          onSelect={(location) => {
            setCoords(location);
            onLocationSelect(location);
          }}
        />
      )}

      {/* City input */}
      {method === "city" && (
        <div>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={handleCitySubmit}>
            Set City
          </button>
        </div>
      )}

      {/* Show selected location */}
      {coords && (
        <p>
          Selected: {coords.lat}, {coords.lng}
        </p>
      )}

    </div>

  );

};

export default LocationPicker;
