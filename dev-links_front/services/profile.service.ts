import { ProfileSchemaType } from "@/schema/ProfileSchema";
import { apiRequest } from "@/lib/apiHandler";

export const updateProfile = async (data: FormData) => {
  const response = await apiRequest("put", "/users/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getProfile = async () => {
  const response = await apiRequest("get", "/users/profile");
  return response;
};
