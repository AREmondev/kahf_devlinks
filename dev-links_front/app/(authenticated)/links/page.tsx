"use client";
import SectionCard from "@/components/common/SectionCard";
import LinkItems from "@/components/profile/LinkItems";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import Image from "next/image";
import React, { useEffect } from "react";
import { FaBars, FaEllipsisV, FaGithub, FaPlus, FaTrash } from "react-icons/fa";
import Dropdown from "@/components/ui/Dropdown";
import InputField from "@/components/ui/InputField";
import LinksCard from "@/components/common/LinksCard";
import Links from "@/components/links/Links";
import { useUserProfileStore } from "@/store/userProfileStore";
import { getUserLinks } from "@/services/links.service";

const page = () => {
  return (
    <div className="grid gap-5 grid-cols-12">
      <LinksCard />
      <Links />
    </div>
  );
};

export default page;
