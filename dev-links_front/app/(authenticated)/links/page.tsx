import SectionCard from "@/components/common/SectionCard";
import LinkItems from "@/components/profile/LinkItems";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import Image from "next/image";
import React from "react";
import { FaBars, FaEllipsisV, FaGithub, FaPlus, FaTrash } from "react-icons/fa";
import Dropdown from "@/components/ui/Dropdown";
import InputField from "@/components/ui/InputField";

const page = () => {
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
            Customize your links
          </Text>
          <Text className="" variant="base">
            Add/edit/remove links below and then share your profile with the
            world!
          </Text>
        </div>
        <Button
          outline
          className="w-full"
          title="Add new link"
          variant="add"
          icon={<FaPlus />}
        />
        <div className="flex flex-col w-full gap-5">
          <div className="p-5 rounded-md bg-background">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex cursor-pointer items-center gap-1">
                  {/* menu 3 bar icon */}
                  <FaBars className="text-text-dark" size={12} />
                  {/* 3 dot icon */}
                  {/* <FaEllipsisV /> */}
                  <Text variant="label">Link#1</Text>
                </div>
                {/* Remove/trusc icon with red color */}
                <FaTrash className="text-red-500 cursor-pointer" />

                {/* <Button variant="link" title="Remove" icon={<FaTrash />} /> */}
              </div>
              {/* dropdown select item  */}
              <Dropdown
                options={[
                  { value: "github", label: "GitHub" },
                  { value: "twitter", label: "Twitter" },
                  { value: "linkedin", label: "LinkedIn" },
                  { value: "youtube", label: "YouTube" },
                ]}
                value=""
                label="Select Platform"
                placeholder="Choose a platform"
                className="mb-4"
              />
              <InputField
                name="link"
                label="Link"
                placeholder="https://www.example.com"
                variant="secondary"
              />
              {/* <Dropdown
                options={[
                  { value: "github", label: "GitHub" },
                  { value: "twitter", label: "Twitter" },
                  { value: "linkedin", label: "LinkedIn" },
                  { value: "youtube", label: "YouTube" },
                ]}
                value=""
                label="Select Platform"
                placeholder="Choose a platform"
                className="mb-4"
              /> */}
            </div>
          </div>
          <div className="p-5 rounded-md bg-background">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex cursor-pointer items-center gap-1">
                  {/* menu 3 bar icon */}
                  <FaBars className="text-text-dark" size={12} />
                  {/* 3 dot icon */}
                  {/* <FaEllipsisV /> */}
                  <Text variant="label">Link#2</Text>
                </div>
                {/* Remove/trusc icon with red color */}
                <FaTrash className="text-red-500 cursor-pointer" />

                {/* <Button variant="link" title="Remove" icon={<FaTrash />} /> */}
              </div>
              {/* dropdown select item  */}
              <Dropdown
                options={[
                  { value: "github", label: "GitHub" },
                  { value: "twitter", label: "Twitter" },
                  { value: "linkedin", label: "LinkedIn" },
                  { value: "youtube", label: "YouTube" },
                ]}
                value=""
                label="Select Platform"
                placeholder="Choose a platform"
                className="mb-4"
              />
              <InputField
                name="link"
                label="Link"
                placeholder="https://www.example.com"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default page;
