"use client";

import LoginForm from "./components/LoginForm";
import { Suspense } from "react";

export default function Login() {
  return (
    <div className="bg-background">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
