import axios from "axios";
import { clearAuth, getAccessToken } from "@moodmate/auth/auth";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData && config.headers) {
    delete config.headers["Content-Type"];
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();

      if (!["/login", "/register", "/"].includes(window.location.pathname)) {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
