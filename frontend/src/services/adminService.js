import axios from "axios";

// Helper to grab token
const getConfig = () => {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export const getAdminStats = async () => {
    const response = await axios.get("http://localhost:5000/api/admin/stats", getConfig());
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/admin/users", getConfig());
    return response.data;
};

export const getAllAlerts = async () => {
    const response = await axios.get("http://localhost:5000/api/admin/alerts", getConfig());
    return response.data;
};

export const getAllIncidents = async () => {
    const response = await axios.get("http://localhost:5000/api/admin/incidents", getConfig());
    return response.data;
};

export const toggleBlockUser = async (userId) => {
    const response = await axios.patch(`http://localhost:5000/api/admin/users/${userId}/block`, {}, getConfig());
    return response.data;
};
