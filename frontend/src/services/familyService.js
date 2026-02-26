import axios from "axios";

const API = "http://localhost:5000/api/family";

export const getFamilyMember = (id) =>
  axios.get(`${API}/${id}`);

export const getLiveLocation = (id) =>
  axios.get(`${API}/location/${id}`);

export const triggerSOS = (id) =>
  axios.post(`${API}/sos/${id}`);
