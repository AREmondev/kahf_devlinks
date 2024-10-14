// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   name,
//   type = "text",
//   placeholder,
//   className,
//   variant = "primary",
//   value,
// }) => {
//   if (variant === "primary") {
//     return (
//       <div className={cn("grid w-full items-center grid-cols-7", className)}>
//         <Text variant="label" className="block col-span-3 flex-1 text-gray-700">
//           {label}
//         </Text>
//         <input
//           id={name}
//           type={type}
//           name={name}
//           placeholder={placeholder}
//           value={value}
//           className="col-span-4 p-2 border border-gray-300 rounded-md w-full text-black"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className={cn("w-full", className)}>
//       <Text variant="label" className="block col-span-3 flex-1 text-gray-700">
//         {label}
//       </Text>
//       <input
//         type={type}
//         name={name}
//         placeholder={placeholder}
//         value={value}
//         className="p-2 border border-gray-300 rounded-md w-full text-black"
//       />
//     </div>
//   );
// };

// export default InputField;

import React, { forwardRef } from "react";
import { cn } from "@/lib/cn";
import Text from "./Text";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, variant = "primary", className, ...props }, ref) => {
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
        <input
          ref={ref}
          className={`px-3 col-span-4  text-black placeholder:text-text-light py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...props}
        />
        {error && (
          <Text variant="small" className="text-red-500">
            {error}
          </Text>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
