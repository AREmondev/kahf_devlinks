"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Text from "@/components/ui/Text";
import { useState } from "react";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    console.log(result);

    // if (result?.error) {
    //   setError(result.error);
    // } else {
    //   router.push("/dashboard");
    // }
    setLoading(false);
  };

  return (
    <div className="bg-background">
      <div className="max-w-[400px] py-10 mx-auto">
        <Text variant="cardTitle" className="text-text-dark mb-10">
          Login
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            variant="secondary"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
          />
          <InputField
            label="Password"
            type="password"
            variant="secondary"
            {...register("password", { required: "Password is required" })}
            error={errors.password?.message}
          />
          <div className="flex justify-end py-2.5">
            {error && <Text variant="error">{error}</Text>}
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary" title="Log In" />
          </div>
        </form>
        <div className="flex mt-10 justify-center items-center gap-1">
          <Text variant="button" className="text-text-dark">
            Don't have an account?
          </Text>
          <Button
            className="text-primary underline"
            variant="link"
            title="Sign Up"
            href="/signup"
          />
        </div>
      </div>
    </div>
  );
}
