import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});

instance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    // type guard check need to refresh or not
    if (
      error.response.data.errCode === 'INVALID_ACCESS_TOKEN' &&
      !originalConfig._retry
    ) {
      try {
        originalConfig._retry = true;
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
          { withCredentials: true }
        );

        useAuthStore.getState().setAuth(res.data.user, res.data.access_token);
        originalConfig.headers.Authorization = `Bearer ${res.data.access_token}`;
        return instance(originalConfig);
      } catch (err) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export { instance as axios };

// ['/auth/login', '/auth/register','/auth/forget-password']
