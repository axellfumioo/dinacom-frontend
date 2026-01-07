import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  console.error("❌ NEXT_PUBLIC_API_BASE_URL is not defined");
}

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  console.log("API Request:", {
    method: config.method?.toUpperCase(),
    fullURL: `${config.baseURL}${config.url}`,
    data: config.data,
  });

  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject({
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Request Failed",
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default api;
