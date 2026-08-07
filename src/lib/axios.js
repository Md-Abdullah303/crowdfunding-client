import axios from "axios";

const api = axios.create({
  baseURL: "", // Let Next.js API rewrites handle proxying to the backend
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
