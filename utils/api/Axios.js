import axios from "axios";
import useAuthStore from "../storage/auth";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const { token } = useAuthStore.getState();
    // console.log("there is a token", !!token);
    if (config?.headers && token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
