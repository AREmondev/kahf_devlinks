"use client";
import React, { useState, useEffect } from "react";
import { useUserProfileStore } from "@/store/userProfileStore";
import { getProfile, generateShareLink } from "@/services/profile.service";
import Button from "@/components/ui/Button";
import LinksCard from "@/components/common/LinksCard";
import ProfileForm from "@/components/profile/ProfileForm";

export default function Profile() {
  return (
    <div className="grid gap-5 grid-cols-12">
      <LinksCard />
      <ProfileForm />
    </div>
  );
}
