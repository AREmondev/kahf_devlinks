import { apiRequest } from "@/lib/apiHandler";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiRequest("post", "/auth/login", {
      email,
      password,
    });
    return response;
  },

  signup: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const response = await apiRequest("post", "/auth/signup", {
      email,
      password,
      firstName,
      lastName,
    });
    return response;
  },

  logout: async () => {
    const response = await apiRequest("post", "/auth/logout");
    return response;
  },
  refreshToken: async () => {
    const response = await apiRequest("post", "/auth/refresh-token");
    return response;
  },
};
