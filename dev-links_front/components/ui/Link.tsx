import React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/cn";
import Text from "./Text";

interface LinkProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  className?: string;
}

const Link: React.FC<LinkProps> = ({
  href,
  icon,
  label,
  isActive = false,
  className,
}) => {
  const baseClasses =
    "flex w-fit items-center gap-2.5 hover:bg-primary/20 px-3 py-2 rounded-md transition-colors duration-200";
  const activeClasses = "bg-[#633bfe38] text-primary";
  const inactiveClasses = "text-text-dark hover:text-primary ";

  return (
    <NextLink href={href} passHref>
      <div
        className={cn(
          baseClasses,
          isActive ? activeClasses : inactiveClasses,
          "group hover:bg-[#633bfe38]", // Add group class for hover effects
          className
        )}
      >
        <span className="group-hover:text-primary transition-colors duration-200">
          {icon}
        </span>
        <Text
          className="group-hover:text-primary text-text-dark transition-colors duration-200"
          variant="link"
        >
          {label}
        </Text>
      </div>
    </NextLink>
  );
};

export default Link;
