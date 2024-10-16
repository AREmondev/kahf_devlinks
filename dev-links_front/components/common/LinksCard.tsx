"use client";
import { getMediaUrl } from "@/lib/urls";
import Image from "next/image";
import Button from "../ui/Button";
import React, { useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { useUserProfileStore } from "@/store/userProfileStore";
import Text from "../ui/Text";
import SectionCard from "./SectionCard";
import { cn } from "@/lib/cn";
import { getUserLinks } from "@/services/links.service";
import { useSession } from "next-auth/react";
import { Link } from "@/types/link";
const LinksCard = () => {
  const { data: session } = useSession();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const setLinks = useUserProfileStore((state) => state.setLinks);
  const fetchLinks = async () => {
    const response = await getUserLinks();
    setLinks(response.data);
  };
  useEffect(() => {
    if (session?.accessToken) {
      fetchLinks();
    }
  }, [session]);

  console.log(userProfile);
  return (
    <SectionCard className="col-span-5 hidden md:flex items-start justify-center">
      <div className="relative w-[300px] h-[600px]">
        <Image
          src="/images/phone.png"
          alt="mobile"
          width={375}
          height={312}
          className="w-full h-full "
        />
        <div className="absolute flex flex-col items-center justify-center gap-10 w-full max-w-[240px] transform -translate-x-1/2   left-1/2 top-20">
          <div className="flex flex-col items-center justify-center gap-2.5">
            <div className="h-[120px] w-[120px] bg-red-400 rounded-full overflow-hidden">
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
                icon={
                  link.platform === "youtube" ? (
                    <FaYoutube />
                  ) : link.platform === "linkedin" ? (
                    <FaLinkedin />
                  ) : link.platform === "github" ? (
                    <FaGithub />
                  ) : link.platform === "twitter" ? (
                    <FaTwitter />
                  ) : (
                    ""
                  )
                }
                bgColor="black"
                href={link.url}
                target="_blank"
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
            {/* <Button
              icon={<FaGithub />}
              bgColor="black"
              href="/profile/edit"
              // variant="link"
              title="Github"
              className="w-full "
            />
            <Button
              icon={<FaGithub />}
              href="/profile/edit"
              // variant="link"
              title="Youtube"
              className="!bg-[#FF0000] w-full hover:bg-[#cc0000]"
            />
            <Button
              icon={<FaGithub />}
              href="/profile/edit"
              // variant="link"
              className="!bg-[#0077B5] w-full hover:bg-[#006699]"
              title="Linkedin"
            /> */}
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default LinksCard;
