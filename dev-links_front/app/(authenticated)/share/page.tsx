"use client";
import React, { useEffect, useState } from "react";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { FaTwitter, FaFacebook, FaLinkedin, FaCopy } from "react-icons/fa";
import { generateShareLink, getProfile } from "@/services/profile.service";
import { useUserProfileStore } from "@/store/userProfileStore";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const ShareLinksPage: React.FC = () => {
  const [profileLink, setProfileLink] = useState(
    "https://devlinks.com/yourprofile"
  );

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
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
  const { data: session } = useSession();
  const [shareLink, setShareLink] = useState<string | null>(null);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const setUserProfile = useUserProfileStore((state) => state.updateProfile);
  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUserProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };
  useEffect(() => {
    // get profile from api
    if (userProfile.shareToken) {
      setProfileLink(
        `${window.location.origin}/preview/${userProfile.shareToken}`
      );
    }
  }, [userProfile.shareToken]);
  useEffect(() => {
    if (session?.accessToken) {
      fetchProfile();
    }
  }, [setUserProfile, session?.accessToken]);
  const [loading, setLoading] = useState(false);

  const handleGenerateShareLink = async () => {
    setLoading(true);
    try {
      const response = await generateShareLink();
      setShareLink(response.shareLink);
      setUserProfile({ ...userProfile, shareToken: response.shareLink });
    } catch (error) {
      console.error("Failed to generate share link:", error);
    }
    setLoading(false);
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
          {userProfile.shareToken && (
            <>
              <InputField
                label=""
                name="profileLink"
                value={userProfile.shareToken && profileLink}
                variant="secondary"
                className="flex-grow"
              />
              <Button
                variant="primary"
                title="Copy"
                outline
                className="w-fit min-w-fit flex-1"
                icon={<FaCopy />}
                onClick={() => copyToClipboard(profileLink)}
              />
            </>
          )}

          <Button
            className="w-fit min-w-fit flex-1"
            onClick={handleGenerateShareLink}
            loading={loading}
            title={shareLink ? "Regenerate Share Link" : "Generate Share Link"}
            disabled={loading}
          />
        </div>
      </div>
      {userProfile.shareToken && (
        <>
          <Text variant="subTitle" className="mb-4">
            Share on Social Media
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="link"
              title="Share on Twitter"
              icon={<FaTwitter size={24} />}
              onClick={shareOnTwitter}
            />
            <Button
              variant="link"
              title="Share on Facebook"
              icon={<FaFacebook size={24} />}
              className=" !bg-[#4267B2] hover:bg-[#365899] "
              onClick={shareOnFacebook}
            />
            <Button
              variant="link"
              title="Share on LinkedIn"
              icon={<FaLinkedin size={24} />}
              className="!bg-[#0077B5] hover:bg-[#006699]"
              onClick={shareOnLinkedIn}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShareLinksPage;
