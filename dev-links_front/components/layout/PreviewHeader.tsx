import React from "react";
import Image from "next/image";
import { FaHome, FaRegUserCircle, FaUser } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import Text from "../ui/Text";
import Link from "../ui/Link";
import Button from "../ui/Button";
import NextLink from "next/link";
const PreviewHeader: React.FC<{}> = ({}) => {
  return (
    <div className="flex mt-5 p-5 mb-5 shadow-sm  bg-bgSecondary rounded-md items-center justify-between">
      <Button href="profile" title="Back to editor" variant="primary" outline />
      {/* Page Link Area */}

      <div className="flex items-center gap-2 5">
        <Button
          href="/share"
          variant="primary"
          title="Share Link"
          //   icon={<FaMoon size={16} />}
        />

        {/* <Link href="/" icon={<FaHome size={16} />} label="Home" /> */}
      </div>
      {/* Preview Button */}
    </div>
  );
};

export default PreviewHeader;
