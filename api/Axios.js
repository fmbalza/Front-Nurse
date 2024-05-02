import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export const authApi = axios.create({
	baseURL: import.meta.env.VITE_AUTH_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	async (config) => {
		const { token } = useAuthStore.getState();

		if (config?.headers && token) {
			config.headers.authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);