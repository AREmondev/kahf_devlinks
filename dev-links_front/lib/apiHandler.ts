import axios from "axios";
import { api } from "@/utils/api";

// Define a general API response structure

// Function to log messages conditionally
const logMessage = (message: string, error?: boolean) => {
  if (process.env.NODE_ENV === "development") {
    if (error) {
      console.error(message);
    } else {
      console.log(message);
    }
  }
};

interface ApiResponse {
  success: boolean;
  data: any;
  error: any;
}

// General function to handle all types of API requests
export const apiRequest = async (
  method: "get" | "post" | "put" | "patch" | "delete",
  endpoint: string,
  payload?: any,
  header?: any
): Promise<ApiResponse> => {
  try {
    let response;
    switch (method) {
      case "get":
        response = await api.get(endpoint, payload);
        break;
      case "post":
        response = await api.post(endpoint, payload, header);
        break;
      case "put":
        response = await api.put(endpoint, payload, header);
        break;
      case "patch":
        response = await api.patch(endpoint, payload, header);
        break;
      case "delete":
        response = await api.delete(endpoint, payload);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    // logMessage(
    //   `Response from API '${endpoint}': ${JSON.stringify(response.data)}`
    // );
    return {
      success: true,
      data: response.data,
      error: {
        message: "An unexpected error occurred",
        statusCode: response.data.statusCode || 200,
      },
    };
  } catch (error) {
    let errorData = null;
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.data?.errors) {
        errorData = error.response.data?.errors[0] && {
          message:
            error.response.data?.errors[0]?.msg ||
            "An unexpected error occurred",
          statusCode: error.response.data.status || 500,
        };
      } else {
        errorData = error.response.data && {
          message:
            error.response.data?.message || "An unexpected error occurred",
          statusCode: error.response.data.status || 500,
        };
      }
    }
    logMessage(`Error in API '${endpoint}': ${error}`, true);
    return { success: false, error: errorData, data: null };
  }
};

const apiHandler = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiHandler.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // Remove Content-Type header for FormData
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});
