import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const setupAxiosInterceptors = async (getToken) => {
  axiosInstance.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};

export default axiosInstance;
