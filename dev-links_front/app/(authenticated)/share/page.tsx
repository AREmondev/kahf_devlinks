"use client";
import React, { useState } from "react";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { FaTwitter, FaFacebook, FaLinkedin, FaCopy } from "react-icons/fa";

const ShareLinksPage: React.FC = () => {
  const [profileLink, setProfileLink] = useState(
    "https://devlinks.com/yourprofile"
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileLink);
    alert("Link copied to clipboard!");
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=Check%20out%20my%20DevLinks%20profile!&url=${encodeURIComponent(
      profileLink
    )}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      profileLink
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      profileLink
    )}`;
    window.open(linkedInUrl, "_blank");
  };

  return (
    <div className="container min-h-screen mx-auto px-4 py-8">
      <Text variant="pageTitle" className="mb-6">
        Share Your Links
      </Text>

      <div className="bg-bgSecondary rounded-md p-6 mb-8">
        <Text variant="subTitle" className="mb-4">
          Your Profile Link
        </Text>
        <div className="flex items-center gap-4">
          <InputField
            label=""
            name="profileLink"
            value={profileLink}
            variant="secondary"
            className="flex-grow"
          />
          <Button
            variant="primary"
            title="Copy"
            outline
            className="w-fit min-w-fit flex-1"
            icon={<FaCopy />}
            onClick={copyToClipboard}
          />
        </div>
      </div>

      <Text variant="subTitle" className="mb-4">
        Share on Social Media
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="custom"
          title="Share on Twitter"
          icon={<FaTwitter size={24} />}
          className=" bg-[#1DA1F2] hover:bg-[#1a91da] "
          onClick={shareOnTwitter}
        />
        <Button
          variant="custom"
          title="Share on Facebook"
          icon={<FaFacebook size={24} />}
          className=" bg-[#4267B2] hover:bg-[#365899] "
          onClick={shareOnFacebook}
        />
        <Button
          variant="custom"
          title="Share on LinkedIn"
          icon={<FaLinkedin size={24} />}
          className="bg-[#0077B5] hover:bg-[#006699]"
          onClick={shareOnLinkedIn}
        />
      </div>
    </div>
  );
};

export default ShareLinksPage;
