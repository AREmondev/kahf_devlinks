"use client";

import SectionCard from "@/components/common/SectionCard";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import Text from "@/components/ui/Text";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { cn } from "@/lib/cn";
import { getMediaUrl } from "@/lib/urls";
import { ProfileSchemaType } from "@/schema/ProfileSchema";
import { getUserLinks } from "@/services/links.service";
import { getProfile, getSharedProfile } from "@/services/profile.service";
import { useUserProfileStore } from "@/store/userProfileStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaGithub, FaHome } from "react-icons/fa";

export default function Home() {
  const { data: session } = useSession();

  // const [userProfile, setUserProfile] = useState<any>();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const setProfile = useUserProfileStore((state) => state.updateProfile);
  const setLinks = useUserProfileStore((state) => state.setLinks);
  const { token } = useParams();
  const tokenString = token as string;

  const fetchProfileFromToken = async () => {
    const response = await getSharedProfile(tokenString);
    console.log("response with token", response);
    setProfile(response.data);
  };

  useEffect(() => {
    fetchProfileFromToken();
  }, []);

  return (
    <div className=" mx-10 relative">
      <div className="bg-white gap-10 flex items-center justify-start flex-col w-[300px] h-[50vh] absolute top-[25vh] z-[999] shadow-md left-1/2 -translate-x-1/2 -translate-y-1/2 p-10  rounded-2xl ">
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="h-[100px] w-[100px] bg-red-400 rounded-full overflow-hidden">
            <Image
              src={getMediaUrl(userProfile.profileImage)}
              alt="profile"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Text variant="base" className="text-text-dark font-medium">
              {userProfile.email}
            </Text>
            <Text variant="base" className="text-text-dark font-medium">
              {userProfile.firstName} {userProfile.lastName}
            </Text>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2.5">
          {userProfile.links.map((link) => (
            <Button
              icon={<FaGithub />}
              bgColor="black"
              href={link.url}
              // variant="link"
              title={
                link.platform === "youtube"
                  ? "Youtube"
                  : link.platform === "linkedin"
                  ? "Linkedin"
                  : link.platform === "github"
                  ? "Github"
                  : link.platform === "twitter"
                  ? "Twitter"
                  : ""
              }
              className={cn(
                "w-full ",
                link.platform === "youtube" ? "!bg-[#FF0000]" : "",
                link.platform === "linkedin" ? "!bg-[#0077B5]" : "",
                link.platform === "github" ? "!bg-[#0077B5]" : "",
                link.platform === "twitter" ? "!bg-[#0077B5]" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
