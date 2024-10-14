import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import ProfileImageUpload from "./ProfileImageUpload";
import ProfileInputs from "./ProfileInputs";
import { ProfileSchema, ProfileSchemaType } from "@/schema/ProfileSchema";
import { useUserProfileStore } from "@/store/userProfileStore";
import { useSession } from "next-auth/react";
import { updateProfile } from "@/services/profile.service";
import { toast } from "react-toastify";
import SectionCard from "../common/SectionCard";
import Text from "../ui/Text";

const ProfileForm = () => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: session?.user?.name?.split(" ")[0] || "",
      lastName: session?.user?.name?.split(" ")[1] || "",
      email: session?.user?.email || "",
    },
  });

  const profile = useUserProfileStore((state) => state.userProfile);
  console.log("profile", profile);

  useEffect(() => {
    setValue("firstName", profile.firstName);
    setValue("lastName", profile.lastName);
    setValue("email", profile.email);
  }, [profile]);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const updateUserProfile = useUserProfileStore((state) => state.updateProfile);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ProfileSchemaType) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    const response = await updateProfile(formData);
    console.log("Response:", response);
    updateUserProfile({
      ...userProfile,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });

    if (response.success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error("Error updating profile");
    }
    setLoading(false);
  };

  return (
    <SectionCard className="col-span-12 md:col-span-7 flex flex-col w-full gap-5">
      <div className="flex flex-col gap-2.5">
        <Text className="" variant="sectionTitle">
          Profile Details
        </Text>
        <Text className="" variant="base">
          Add your details to create a personal touch to your profile.
        </Text>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2.5"
        >
          <ProfileImageUpload />
          <ProfileInputs
            register={register}
            errors={errors}
            setValue={setValue}
          />

          <div className="flex items-center justify-end">
            <Button
              type="submit"
              className="w-fit"
              variant="primary"
              title="Save"
              loading={loading}
            />
          </div>
        </form>
      </div>
    </SectionCard>
  );
};

export default ProfileForm;
