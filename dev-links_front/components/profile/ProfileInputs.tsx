import React from "react";
import InputField from "@/components/ui/InputField";
import { ProfileSchemaType } from "@/schema/ProfileSchema";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

interface ProfileInputsProps {
  register: UseFormRegister<ProfileSchemaType>;
  errors: FieldErrors<ProfileSchemaType>;
  setValue: UseFormSetValue<ProfileSchemaType>;
}

const ProfileInputs: React.FC<ProfileInputsProps> = ({
  register,
  errors,
  setValue,
}) => {
  return (
    <div className="min-h-[200px] items-center p-5 gap-2.5  w-full rounded-md bg-background">
      {/* Profile picture */}
      <div className="flex w-full items-center flex-wrap justify-between gap-5">
        {/* <Text variant="label">First Name:</Text> */}
        <InputField
          label="First Name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <InputField
          label="Last Name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <InputField
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>
      {/*  */}
    </div>
  );
};

export default ProfileInputs;
