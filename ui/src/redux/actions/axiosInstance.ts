import axios from 'axios';
import { getCookie, clearAuthToken } from '../actions/auth';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api',
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = getCookie('accessToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			clearAuthToken();
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
