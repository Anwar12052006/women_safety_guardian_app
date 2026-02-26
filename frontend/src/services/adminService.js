import axios from "axios";

// Helper to grab token
const getConfig = () => {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export const getAdminStats = async () => {
    const response = await axios.get("https://new-women-safety-app.onrender.com/api/admin/stats", getConfig());
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get("https://new-women-safety-app.onrender.com/api/admin/users", getConfig());
    return response.data;
};

export const getAllAlerts = async () => {
    const response = await axios.get("https://new-women-safety-app.onrender.com/api/admin/alerts", getConfig());
    return response.data;
};

export const getAllIncidents = async () => {
    const response = await axios.get("https://new-women-safety-app.onrender.com/api/admin/incidents", getConfig());
    return response.data;
};

export const toggleBlockUser = async (userId) => {
    const response = await axios.patch(`https://new-women-safety-app.onrender.com/api/admin/users/${userId}/block`, {}, getConfig());
    return response.data;
};
