import axios from "axios";

const API =
"http://localhost:5000/api/tracking";

export const shareLocation =
() =>
axios.post(
 `${API}/share-location`,
 {},
 {
  headers:
  {
   Authorization:
   `Bearer ${localStorage.getItem("token")}`
  }
 }
);

export const getTrackingStatus =
(userId) =>
axios.get(
 `${API}/status/${userId}`
);

export const trackerJoined =
(userId, data) =>
axios.post(
 `${API}/tracker-joined/${userId}`,
 data
);
