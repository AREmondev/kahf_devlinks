"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosAuth } from "../utils/api";
import { UseRefreshToken } from "./useRefreshToken";

const UseAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = UseRefreshToken();
  useEffect(() => {
    if (session) {
      const requestIntercepter = axiosAuth.interceptors.request.use(
        async (config) => {
          try {
            if (!config.headers["Authorization"]) {
              config.headers[
                "Authorization"
              ] = `Bearer ${session?.accessToken}`;
            }
            return config;
          } catch (error) {
            console.error("Error setting authorization header:", error);
            return Promise.reject(error);
          }
        }
      );

      const responseInterceptor = axiosAuth.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error.config;
          if (error?.response?.status === 401 && !prevRequest.sent) {
            prevRequest.sent = true;
            await refreshToken();

            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${session?.accessToken}`;
            return axiosAuth(prevRequest);
          }
          return Promise.reject(error);
        }
      );

      return () => {
        axiosAuth.interceptors.request.eject(requestIntercepter);
        axiosAuth.interceptors.request.eject(responseInterceptor);
      };
    }
  }, [session?.user?.id]);

  return axiosAuth;
};

export default UseAxiosAuth;
