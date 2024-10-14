import { signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    try {
      const response = await api.post("/auth/refresh-token", {
        refreshToken: session?.refreshToken,
      });

      if (session) {
        await update({
          ...session,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
      }

      return response.data.accessToken;
    } catch (error) {
      signOut();
      console.error("Error refreshing token:", error);
      throw error;
    }
  };

  return refreshToken;
};
