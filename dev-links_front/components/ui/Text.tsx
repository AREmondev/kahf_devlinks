import React from "react";
import { cn } from "@/lib/cn";

type TextVariant =
  | "pageTitle"
  | "sectionTitle"
  | "cardTitle"
  | "subTitle"
  | "base"
  | "label"
  | "button"
  | "link"
  | "small"
  | "error";

interface TextProps {
  variant: TextVariant;
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const variantClasses: Record<TextVariant, string> = {
  pageTitle: "text-4xl font-bold text-text-dark",
  sectionTitle: "text-3xl font-semibold text-text-dark",
  cardTitle: "text-2xl font-semibold text-text-dark",
  subTitle: "text-xl font-semibold text-text-dark",
  base: "text-base text-text-primary",
  label: "text-sm font-medium text-text-primary",
  button: "text-sm font-medium",
  link: "text-sm text-primary",
  small: "text-xs text-text-primary",
  error: "text-sm text-red-500",
};

const variantElements: Partial<
  Record<TextVariant, keyof JSX.IntrinsicElements>
> = {
  pageTitle: "h1",
  sectionTitle: "h2",
  cardTitle: "h3",
  subTitle: "h4",
};

const Text: React.FC<TextProps> = ({ variant, children, className, as }) => {
  const Component = as || variantElements[variant] || "span";

  return (
    <Component className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  );
};

export default Text;
