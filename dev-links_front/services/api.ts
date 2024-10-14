import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
});

api.interceptors.request.use(
  (config) => {
    // You can add headers or do other modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

export default api;
