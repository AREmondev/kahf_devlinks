import React from "react";
import { Control, useController } from "react-hook-form";
import InputField from "../ui/InputField";
import Dropdown from "../ui/Dropdown";
import { FaBars, FaTrash } from "react-icons/fa";
import Text from "../ui/Text";
import { deleteLink } from "@/services/links.service";
import { Link } from "@/types/link";
interface FormData {
  links: Link[];
}
interface LinkItemProps {
  control: Control<FormData>;
  index: number;
  remove: () => void;
  selectedPlatforms: string[];
}

const LinkItem: React.FC<LinkItemProps> = ({
  control,
  index,
  remove,
  selectedPlatforms,
}) => {
  const { field: idField } = useController({
    name: `links.${index}._id`,
    control,
  });

  const { field: platformField, fieldState: platformFieldState }: any =
    useController({
      name: `links.${index}.platform`,
      control,
      rules: {
        required: "Platform is required",
        validate: (value) =>
          !selectedPlatforms.includes(value) ||
          value === platformField.value ||
          "This platform is already selected",
      },
    });

  const { field: urlField, fieldState: urlFieldState } = useController({
    name: `links.${index}.url`,
    control,
    rules: {
      required: "URL is required",
      validate: (value) => {
        const urlPattern =
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return urlPattern.test(value) || "Please enter a valid URL";
      },
    },
  });

  const handlePlatformChange = (value: string) => {
    platformField.onChange(value);
  };

  const availablePlatforms = [
    { value: "github", label: "GitHub" },
    { value: "twitter", label: "Twitter" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "youtube", label: "YouTube" },
  ].filter(
    (platform) =>
      !selectedPlatforms.includes(platform.value) ||
      platform.value === platformField.value
  );

  return (
    <div className="flex flex-col gap-2.5">
      <input type="hidden" {...idField} />
      <div className="flex items-center justify-between">
        <div className="flex cursor-pointer items-center gap-1">
          <FaBars className="text-text-dark" size={12} />
          <Text variant="label">Link #{index + 1}</Text>
        </div>
        <FaTrash className="text-red-500 cursor-pointer" onClick={remove} />
      </div>
      <Dropdown
        options={availablePlatforms}
        value={platformField.value}
        onChange={handlePlatformChange}
        label="Select Platform"
        placeholder="Choose a platform"
        className="mb-4"
        error={platformFieldState.error?.message}
      />
      <InputField
        name={urlField.name}
        label="Link"
        placeholder="https://www.example.com"
        variant="secondary"
        value={urlField.value}
        onChange={urlField.onChange}
        error={urlFieldState.error?.message}
      />
    </div>
  );
};

export default LinkItem;
