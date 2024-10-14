import { cn } from "@/lib/cn";
import React from "react";

const SectionCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn("bg-white rounded-md p-4", className)}>{children}</div>
  );
};

export default SectionCard;
