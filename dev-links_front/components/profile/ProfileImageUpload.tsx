"use client";

import React, { useState, useRef, useEffect } from "react";
import Text from "@/components/ui/Text";
import { FaImages, FaPlus } from "react-icons/fa";
import { useUserProfileStore } from "@/store/userProfileStore";
import { ProfileSchemaType } from "@/schema/ProfileSchema";
import { UseFormSetValue } from "react-hook-form";
import { getMediaUrl } from "@/lib/urls";
import Image from "next/image";
import { updateProfile } from "@/services/profile.service";
import { toast } from "react-toastify";

const ProfileImageUpload: React.FC<{}> = ({}) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const userProfile = useUserProfileStore((state) => state.userProfile);
  const updateUserProfile = useUserProfileStore((state) => state.updateProfile);
  const updateProfileImage = async (imageFile: File) => {
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }
      const response = await updateProfile(formData);
      console.log("Response:", response);

      // Update the user profile in the store
      updateUserProfile({
        ...userProfile,
        profileImage: response.data.profileImage,
      });
      toast.success("Profile image updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      updateProfileImage(file);
    }
  };

  const profileImage = useUserProfileStore(
    (state) => state.userProfile.profileImage
  );

  console.log(profileImage);

  useEffect(() => {
    if (profileImage) {
      console.log(profileImage);
      setImage(getMediaUrl(profileImage));
    }
  }, [profileImage]);

  return (
    <div className="min-h-[200px] items-center p-5 grid grid-cols-1 gap-2.5 xl:grid-cols-3 w-full rounded-md bg-background">
      <Text variant="label">Profile picture</Text>
      <div
        className="flex items-center justify-center gap-2.5 flex-col h-full rounded-md bg-[#633bfe38] cursor-pointer"
        onClick={handleClick}
      >
        {image ? (
          <div className="h-full rounded-md relative w-full overflow-hidden bg-primary flex items-center justify-center group">
            <Image
              src={image}
              width={100}
              height={100}
              alt="Profile"
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
            />
            <div className="flex items-center justify-center gap-2.5 flex-col h-full rounded-md bg-transparent cursor-pointer absolute top-0 z-30 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaImages className="text-white" size={32} />
              <span className="flex items-center gap-1">
                <FaPlus className="text-white" />
                <Text className="text-white" variant="label">
                  Change Image
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
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>
      <Text variant="small">
        Image must be below 1024x1024px. Use PNG, JPG, or BMP format.
      </Text>
    </div>
  );
};

export default ProfileImageUpload;
