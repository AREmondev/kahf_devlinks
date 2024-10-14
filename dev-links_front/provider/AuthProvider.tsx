"use client";
import { ReactNode, createContext, useState } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  return <SessionProvider basePath="/api/auth">{children}</SessionProvider>;
};

export default AuthProvider;
