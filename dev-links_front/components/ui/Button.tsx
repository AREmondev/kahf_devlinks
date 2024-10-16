import React from "react";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";

interface ButtonProps {
  title: string;
  variant?: "primary" | "secondary" | "link" | "add";
  outline?: boolean;
  icon?: React.ReactNode;
  bgColor?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  outline = false,
  icon,
  bgColor,
  href,
  className,
  onClick,
  type = "button",
  loading = false,
  disabled = false,
  target = "_self",
}) => {
  const baseClasses =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out";

  const variantClasses = {
    primary: outline
      ? "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
      : "bg-primary text-white hover:bg-primary-dark",
    secondary: outline
      ? "bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-white"
      : "bg-secondary text-white hover:bg-secondary-dark",
    link: bgColor
      ? `bg-${bgColor} text-white hover:opacity-80`
      : "bg-primary text-white hover:bg-primary-dark",
    add: "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white",
  };

  const buttonClasses = cn(baseClasses, variantClasses[variant], className, {
    "opacity-50 cursor-not-allowed": disabled || loading,
  });

  const content = (
    <>
      {loading && <FaSpinner className="animate-spin mr-2" />}
      {icon && !loading && icon}
      {title}
    </>
  );

  if (variant === "link" && href) {
    return (
      <Link href={href} className="text-primary underline">
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <Link target={target} href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
};

export default Button;
