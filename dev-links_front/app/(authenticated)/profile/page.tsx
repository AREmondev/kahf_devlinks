"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiHandler } from "@/lib/apiHandler";
import { FaGithub, FaImages, FaPlus } from "react-icons/fa";
import SectionCard from "@/components/common/SectionCard";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import Image from "next/image";
import InputField from "@/components/ui/InputField";

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: FileList;
};

export default function Profile() {
  const { register, handleSubmit, setValue } = useForm<ProfileFormData>();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user profile data and set form values
    const fetchProfile = async () => {
      try {
        const response = await apiHandler.get("/api/v1/auth/profile");
        const userData = response.data.user;
        setValue("firstName", userData.firstName);
        setValue("lastName", userData.lastName);
        setValue("email", userData.email);
        setProfileImage(userData.profileImage);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      if (data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const response = await apiHandler.put("/api/v1/auth/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile updated:", response.data);
      setProfileImage(response.data.user.profileImage);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="grid gap-5 grid-cols-12">
      <SectionCard className="col-span-5 hidden md:flex items-center justify-center">
        {/* mobile */}
        <div className="relative w-[200px] h-[400px]">
          <Image
            src="/images/phone.png"
            alt="mobile"
            width={375}
            height={312}
            className="w-full h-full "
          />
          <div className="absolute flex flex-col items-center justify-center gap-10 max-w-[300px]transform -translate-x-1/2   left-1/2 top-10">
            <div className="flex flex-col items-center justify-center gap-2.5">
              <div className="h-20 w-20 bg-red-400 rounded-full overflow-hidden"></div>
              <div className="flex flex-col gap-2">
                <Text variant="base" className="text-text-dark font-medium">
                  Devlinks
                </Text>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2.5">
              <Button
                icon={<FaGithub />}
                bgColor="black"
                href="/profile/edit"
                variant="link"
                title="Github"
                className="w-full"
              />
              <Button
                icon={<FaGithub />}
                bgColor="red"
                href="/profile/edit"
                variant="link"
                title="Youtube"
                className="w-full"
              />
              <Button
                icon={<FaGithub />}
                bgColor="blue"
                href="/profile/edit"
                variant="link"
                title="Linkedin"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </SectionCard>
      <SectionCard className="col-span-12 md:col-span-7 flex flex-col w-full gap-5">
        <div className="flex flex-col gap-2.5">
          <Text className="" variant="sectionTitle">
            Profile Details
          </Text>
          <Text className="" variant="base">
            Add your details to create a personal touch to your profile.
          </Text>
        </div>
        <div className="min-h-[200px] items-center p-5 grid grid-cols-1 gap-2.5 xl:grid-cols-3  w-full rounded-md bg-background">
          {/* Profile picture */}
          <Text variant="label">Profile picture</Text>
          <div className="flex items-center justify-center gap-2 5 flex-col h-full rounded-md bg-[#633bfe38]">
            {/* Album/image/gallery icon */}
            <FaImages className="text-primary" size={32} />
            <span className="flex items-center gap-1">
              <FaPlus className="text-primary" />
              <Text className=" text-primary" variant="label">
                Upload Image
              </Text>
            </span>
          </div>
          <Text variant="small">
            Image must be below 1024x1024px. Use PNG, JPG, or BMP format.
          </Text>
          {/*  */}
        </div>
        <div className="min-h-[200px] items-center p-5 gap-2.5  w-full rounded-md bg-background">
          {/* Profile picture */}
          <div className="flex w-full items-center flex-wrap justify-between gap-5">
            {/* <Text variant="label">First Name:</Text> */}
            <InputField label="First Name" name="first_name" type="text" />
            <InputField label="Last Name" name="last_name" type="text" />
            <InputField label="email" name="email" type="email" />
          </div>
          {/*  */}
        </div>

        <div className="flex items-center justify-end">
          <Button className="w-fit" variant="primary" title="Save" />
        </div>
      </SectionCard>
    </div>
  );
}
