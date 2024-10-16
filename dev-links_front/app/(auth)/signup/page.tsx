"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signup } from "@/services/auth.service";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import InputField from "@/components/ui/InputField";
import Link from "@/components/ui/Link";

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError(null);
    const response = await signup(
      data.email,
      data.password,
      data.firstName,
      data.lastName
    );
    console.log(response);
    if (response.success) {
      router.push("/login");
    } else {
      setError(response.error?.message || "An unexpected error occurred");
    }
    setLoading(false);
    // router.push("/login");
  };

  return (
    <div className="bg-background">
      <div className="max-w-[400px] py-10 mx-auto">
        <Text variant="cardTitle" className="text-text-dark mb-10">
          Signup
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="First Name"
            type="text"
            variant="secondary"
            {...register("firstName", { required: "First name is required" })}
            error={errors.firstName?.message}
          />
          <InputField
            label="Last Name"
            type="text"
            variant="secondary"
            {...register("lastName", { required: "Last name is required" })}
            error={errors.lastName?.message}
          />
          <InputField
            label="Email"
            type="string"
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            error={errors.password?.message}
          />
          <div className="flex justify-end py-2.5">
            {error && <Text variant="error">{error}</Text>}
          </div>
          <div className="flex justify-end">
            <Button
              loading={loading}
              type="submit"
              variant="primary"
              title="Sign Up"
            />
          </div>
        </form>

        {/* Already have an account? Login */}
        <div className="flex mt-10 justify-center items-center gap-1">
          <Text variant="button" className="text-text-dark">
            Already have an account?
          </Text>
          <Button
            className="text-primary underline"
            variant="link"
            title="Login"
            href="/login"
          />
        </div>
      </div>
    </div>
  );
}
