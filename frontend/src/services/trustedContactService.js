
import axios from "axios";

/*
========================================
AXIOS INSTANCE (Optimized & Scalable)
========================================
*/

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL + "/trusted-contacts",
  baseURL: `${import.meta.env.VITE_API_URL}/trusted-contacts`,
  timeout: 10000, // 10s timeout protection
});

/*
========================================
REQUEST INTERCEPTOR
Auto attach token
========================================
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/*
========================================
RESPONSE INTERCEPTOR
Auto logout if token expired
========================================
*/
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

/*
========================================
API FUNCTIONS
========================================
*/

export const getContacts = async () => {
  const res = await api.get("");
  return res.data;
};

export const addContact = async (data) => {
  const res = await api.post("", data);
  return res.data;
};

export const deleteContact = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

export const sendSOS = async () => {
  const res = await api.post("/sos");
  return res.data;
};