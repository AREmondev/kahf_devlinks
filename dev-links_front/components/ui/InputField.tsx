import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/cn";
import Text from "./Text";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, variant = "primary", className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div
        className={cn(
          variant === "primary"
            ? "grid w-full items-center grid-cols-7"
            : "w-full flex flex-col space-y-1",
          className
        )}
      >
        <label
          htmlFor={props.id || props.name}
          className="text-sm col-span-3 font-medium text-text-dark"
        >
          {label}
        </label>
        <div className="relative col-span-4">
          <input
            ref={ref}
            className={`px-3 w-full text-black placeholder:text-text-light py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              error ? "border-red-500" : "border-gray-300"
            } ${props.type === "password" ? "pr-10" : ""}`}
            {...props}
            type={
              props.type === "password" && showPassword ? "text" : props.type
            }
          />
          {props.type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-400" />
              ) : (
                <FaEye className="text-gray-400" />
              )}
            </button>
          )}
        </div>
        {error && (
          <Text
            variant="small"
            className="text-red-500 col-span-7 w-full text-right"
          >
            {error}
          </Text>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
