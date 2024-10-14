import { ProfileSchemaType } from "@/schema/ProfileSchema";
import { apiRequest } from "@/lib/apiHandler";
import { Link } from "../types/link";

export const addLinks = async (links: Link[]) => {
  const response = await apiRequest("post", "/users/links", {
    links: links,
  });
  return response.data;
};

export const getUserLinks = async () => {
  const response = await apiRequest("get", "/users/links");
  return response.data;
};

export const deleteLink = async (id: string) => {
  const response = await apiRequest("delete", `/users/links/${id}`);
  return response;
};
