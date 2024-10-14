import axios from "axios";
import { useSession } from "next-auth/react";

export const UseRefreshToken = () => {
  const { data: session } = useSession();
  const refresh = session?.refreshToken;

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,

        {
          refresh,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.refreshToken}`, // Use access_token here
          },
        }
      );

      console.log("Refreshed");
      // console.log("Refreshed", res.data);

      if (session) {
        session.accessToken = res.data.accessToken;
      }
    } catch (error) {
      console.log("Error refreshing token:", error);
      console.error("Error refreshing token:", error);
    }
  };

  return refreshToken;
};
