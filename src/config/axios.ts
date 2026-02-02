import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
        { withCredentials: true }
      );

      useAuthStore.getState().setAuth(res.data.access_token, res.data.user);
      originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
      return instance(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }
);

export { instance as axios };
