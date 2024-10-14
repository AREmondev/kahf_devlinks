"use client";

import React, { useState, useRef } from "react";
import Text from "./Text";
import { FaImages, FaPlus } from "react-icons/fa";

const ProfileImageUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-[200px] items-center p-5 grid grid-cols-1 gap-2.5 xl:grid-cols-3 w-full rounded-md bg-background">
      <Text variant="label">Profile picture</Text>
      <div
        className="flex items-center justify-center gap-2.5 flex-col h-full rounded-md bg-[#633bfe38] cursor-pointer"
        onClick={handleClick}
      >
        {image ? (
          <div className="h-full relative w-full overflow-hidden bg-primary flex items-center justify-center">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="flex items-center justify-center gap-2.5 flex-col h-full rounded-md bg-[#633bfe38] cursor-pointer absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
              <FaImages className="text-primary" size={32} />
              <span className="flex items-center gap-1">
                <FaPlus className="text-primary" />
                <Text className="text-primary" variant="label">
                  Upload Image
                </Text>
              </span>
            </div>
          </div>
        ) : (
          <>
            <FaImages className="text-primary" size={32} />
            <span className="flex items-center gap-1">
              <FaPlus className="text-primary" />
              <Text className="text-primary" variant="label">
                Upload Image
              </Text>
            </span>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
      <Text variant="small">
        Image must be below 1024x1024px. Use PNG, JPG, or BMP format.
      </Text>
    </div>
  );
};

export default ProfileImageUpload;
