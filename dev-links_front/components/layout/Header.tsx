"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaInfoCircle,
  FaRegUserCircle,
  FaShareAlt,
  FaCaretDown,
  FaUserCircle,
  FaSignOutAlt,
  FaEye,
} from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import Text from "../ui/Text";
import Link from "../ui/Link";
import Button from "../ui/Button";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import UseAxiosAuth from "@/hooks/useAxiosAuth";
import { useUserProfileStore } from "@/store/userProfileStore";
import { getProfile } from "@/services/profile.service";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const axiosAuth = UseAxiosAuth();

  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const handlePreview = () => {
    router.push("/preview");
  };
  const setProfile = useUserProfileStore((state) => state.updateProfile);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      console.log("response", response.data);
      if (response.data) {
        setProfile({
          ...userProfile,
          ...response.data,
        });
      }

      // return response.data;
    } catch (error) {
      console.log("error", error);
    }
    // return response.data;
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchProfile();
    }
  }, [session?.accessToken]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex p-5 mb-5 shadow-sm bg-bgSecondary rounded-md items-center justify-between">
      <NextLink href="/" className="flex items-center gap-2.5">
        <span className="text-white bg-primary px-1 py-0.5 rounded-md ">
          <CiLink size={16} />
        </span>
        <Text className="text-text-dark dark:text-white" variant="subTitle">
          Devlinks
        </Text>
      </NextLink>
      {session ? (
        <>
          <div className="flex items-center gap-2.5">
            <Link
              isActive={pathname === "/about"}
              href="/about"
              icon={<FaInfoCircle size={16} />}
              label="About"
            />
            <Link
              isActive={pathname === "/links"}
              href="/links"
              icon={<CiLink size={16} />}
              label="Links"
            />
            <Link
              isActive={pathname === "/profile"}
              href="/profile"
              icon={<FaRegUserCircle size={16} />}
              label="Profile Details"
            />
            <Link
              isActive={pathname === "/share"}
              href="/share"
              icon={<FaShareAlt size={16} />}
              label="Share"
            />
          </div>
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              icon={<FaUserCircle size={24} />}
              title={`${userProfile.firstName} ${userProfile.lastName}`}
              className="flex items-center gap-2"
            />
            {isDropdownOpen && (
              <div className="absolute bg-background p-4 gap-2.5 flex flex-col top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Button
                  title="Preview"
                  outline
                  // icon={<FaEye size={16} />}
                  onClick={handlePreview}
                  className="w-full text-left px-4 py-2 "
                />
                <Button
                  title="Logout"
                  icon={<FaSignOutAlt size={16} />}
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 "
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2.5">
          <Link
            isActive={pathname === "/about"}
            href="/about"
            icon={<FaInfoCircle size={16} />}
            label="About"
          />
          <Button variant="primary" title="Login" href="/login" />
          {/* <Button variant="secondary" title="Sign Up" href="/signup" /> */}
        </div>
      )}
    </div>
  );
};

export default Header;
