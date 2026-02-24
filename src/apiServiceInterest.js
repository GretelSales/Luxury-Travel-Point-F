import axios from "axios";

const API_URL =
  "https://luxury-travel-point-frontend.onrender.com/api/service-interest";

export const sendServiceInterest = async (payload) => {
  const token = localStorage.getItem("ltp_token");

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await axios.post(API_URL, payload, { headers });

  return res.data;
};
