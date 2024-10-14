"use client";
import React from "react";
import { cn } from "@/lib/cn";
import Select from "react-select";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  label,
  placeholder,
  className,
}) => {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Select className="text-black" options={options} />
    </div>
  );
};

export default Dropdown;
