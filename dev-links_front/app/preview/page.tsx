"use client";

import SectionCard from "@/components/common/SectionCard";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import Text from "@/components/ui/Text";
import Image from "next/image";
import { FaPlus, FaGithub, FaHome } from "react-icons/fa";

export default function Home() {
  return (
    <div className=" mx-10 relative">
      <div className="bg-white gap-10 flex items-center justify-start flex-col w-[300px] h-[50vh] absolute top-[25vh] z-[999] shadow-md left-1/2 -translate-x-1/2 -translate-y-1/2 p-10  rounded-2xl ">
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="h-[100px] w-[100px] bg-red-400 rounded-full overflow-hidden"></div>
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
  );
}
