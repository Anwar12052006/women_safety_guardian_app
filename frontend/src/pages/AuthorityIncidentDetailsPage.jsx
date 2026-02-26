import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Navbar from "../components/layout/Navbar";
import AuthorityNavbar from "../components/layout/AuthorityNavbar";


const AuthorityIncidentDetailsPage = () => {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    const fetchIncident = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/incidents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        setIncident(data.data);
      }
    };

    fetchIncident();
  }, [id]);

  if (!incident) return <div>Loading...</div>;

  return (
    <>
      {/* <Navbar /> */}
      <AuthorityNavbar />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Incident Details
          </h2>

          <p><strong>User:</strong> {incident.user?.name}</p>
          <p><strong>Email:</strong> {incident.user?.email}</p>
          <p><strong>Type:</strong> {incident.type}</p>
          <p><strong>Severity:</strong> {incident.severity}</p>
          <p><strong>Status:</strong> {incident.status}</p>
          <p><strong>Priority:</strong> {incident.priority}</p>

          <p className="mt-4">
            <strong>Description:</strong>
          </p>
          <div className="bg-gray-50 p-4 rounded mt-2 whitespace-pre-wrap">
            {incident.description}
          </div>

          <p className="mt-4">
            <strong>Location Coordinates:</strong>{" "}
            {incident.location.coordinates[1]},{" "}
            {incident.location.coordinates[0]}
          </p>

          <p>
            <strong>Reported At:</strong>{" "}
            {new Date(incident.reportedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthorityIncidentDetailsPage;