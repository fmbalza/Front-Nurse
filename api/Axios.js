import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use(
// 	async (config) => {
// 		const { token } = useAuthStore.getState();

// 		if (config?.headers && token) {
// 			config.headers.authorization = `Bearer ${token}`;
// 		}

// 		return config;
// 	},
// 	(error) => Promise.reject(error)
// );

export default api;
