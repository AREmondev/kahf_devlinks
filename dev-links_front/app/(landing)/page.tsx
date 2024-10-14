"use client";

import SectionCard from "@/components/common/SectionCard";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import Text from "@/components/ui/Text";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  FaPlus,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaHome,
} from "react-icons/fa";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className=" bg-gradient-to-br from-primary-light to-primary-dark flex items-start justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <div className="md:flex">
            {/* Left side: Profile card */}
            <div className="md:w-1/3 bg-gray-100 p-8 flex flex-col items-center justify-center">
              <div className="h-32 w-32 bg-primary rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder-avatar.png"
                  alt="Profile"
                  width={128}
                  height={128}
                />
              </div>
              <Text
                variant="cardTitle"
                className="text-text-dark font-bold mb-2"
              >
                John Doe
              </Text>
              <Text variant="small" className="text-text-dark text-center mb-6">
                Full-stack Developer | Open Source Enthusiast
              </Text>
              <div className="w-full space-y-3">
                <Button
                  icon={<FaGithub />}
                  bgColor="black"
                  href="https://github.com/johndoe"
                  variant="link"
                  title="GitHub"
                  className="w-full"
                />
                <Button
                  icon={<FaLinkedin />}
                  bgColor="blue"
                  href="https://linkedin.com/in/johndoe"
                  variant="link"
                  title="LinkedIn"
                  className="w-full"
                />
              </div>
            </div>

            {/* Right side: Welcome message and CTA */}
            <div className="md:w-2/3 flex flex-col gap-5 p-8">
              <Text variant="cardTitle" className="text-text-dark font-bold ">
                Welcome to My DevLinks!
              </Text>
              <Text variant="base" className="text-text-muted ">
                I'm passionate about creating amazing web experiences and
                sharing my knowledge with the developer community. Explore my
                projects, watch my tutorials, or connect with me professionally.
              </Text>
              <div className="space-y-4">
                <Button
                  icon={<FaPlus />}
                  variant="primary"
                  title="Create Your Own DevLinks"
                  className="w-full md:w-auto"
                  href={
                    // Is session exist then go to "/links" or go to /login page
                    session?.accessToken ? "/links" : "/login"
                  }
                />
                <Button
                  icon={<FaHome />}
                  variant="primary"
                  outline
                  title="Learn More"
                  className="w-full md:w-auto"
                  href="/about"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
