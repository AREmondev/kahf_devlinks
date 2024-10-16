import { apiRequest } from "@/lib/apiHandler";

export const login = async (email: string, password: string) => {
  const response = await apiRequest("post", "/auth/login", {
    email,
    password,
  });
  return response;
};

export const signup = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  console.log("signup");
  const response = await apiRequest("post", "/auth/signup", {
    email,
    password,
    firstName,
    lastName,
  });
  return response;
};

export const logout = async () => {
  const response = await apiRequest("post", "/auth/logout");
  return response;
};
