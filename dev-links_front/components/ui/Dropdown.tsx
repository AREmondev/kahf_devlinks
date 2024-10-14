"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { FaChevronDown } from "react-icons/fa";
import Text from "./Text";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  className?: string;
  error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder,
  className = "",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`relative ${cn("w-full", className)}`} ref={dropdownRef}>
      <Text variant="label" className="mb-1">
        {label}
      </Text>
      <div
        className={`flex max-h-[42px] items-center justify-between p-3 border rounded-md cursor-pointer ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        onClick={handleToggle}
      >
        <span className={`${value ? "text-black" : "text-gray-400"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FaChevronDown
          className={`transition-transform text-text-dark ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[168px] overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-3 py-2 cursor-pointer h-[42px] flex items-center text-black hover:bg-primary hover:text-white ${
                option.value === value ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <Text variant="error" className="mt-1">
          {error}
        </Text>
      )}
    </div>
  );
};

export default Dropdown;
