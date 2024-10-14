"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaImages, FaPlus } from "react-icons/fa";
import SectionCard from "@/components/common/SectionCard";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import Image from "next/image";
import InputField from "@/components/ui/InputField";
import ProfileImageUpload from "@/components/profile/ProfileImageUpload";
import ProfileForm from "@/components/profile/ProfileForm";
import { useUserProfileStore } from "@/store/userProfileStore";
import { getProfile } from "@/services/profile.service";
import { useSession } from "next-auth/react";
import { getMediaUrl } from "@/lib/urls";
import LinksCard from "@/components/common/LinksCard";

export default function Profile() {
  return (
    <div className="grid gap-5 grid-cols-12">
      <LinksCard />
      <ProfileForm />
    </div>
  );
}
