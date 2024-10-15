"use client";
import React from "react";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { FaLink, FaShare, FaUserPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";

const AboutPage = () => {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-primary-dark py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-5 flex flex-col gap-5 ">
          <Text variant="pageTitle" className="text-text-dark font-bold mb-6">
            About DevLinks
          </Text>

          <Text variant="base" className="text-text-muted">
            DevLinks is a powerful platform designed for developers to create,
            manage, and share their professional links effortlessly. Whether
            you're a seasoned programmer or just starting your coding journey,
            DevLinks helps you showcase your work and connect with the global
            developer community.
          </Text>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaLink className="text-primary text-3xl" />}
              title="Generate Links"
              description="Create custom links for your projects, portfolios, and social profiles."
            />
            <FeatureCard
              icon={<FaShare className="text-primary text-3xl" />}
              title="Share Easily"
              description="Share your DevLinks profile with a single URL, making networking simple."
            />
            <FeatureCard
              icon={<FaUserPlus className="text-primary text-3xl" />}
              title="Grow Your Network"
              description="Connect with other developers and expand your professional network."
            />
          </div>

          <Text
            variant="sectionTitle"
            className="text-text-dark font-semibold mb-4"
          >
            How It Works
          </Text>
          <ol className="list-decimal list-inside space-y-2 text-text-muted ">
            <li>Sign up for a DevLinks account</li>
            <li>Add your professional links and customize your profile</li>
            <li>Generate your unique DevLinks URL</li>
            <li>Share your DevLinks profile with the world</li>
          </ol>

          <div className="text-center">
            <Button
              variant="primary"
              title="Get Started with DevLinks"
              className="px-8 py-3"
              href={session?.accessToken ? "/profile" : "/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-gray-50 p-6 rounded-xl">
    <div className="flex items-center mb-4">
      {icon}
      <Text variant="subTitle" className="text-text-dark font-semibold ml-3">
        {title}
      </Text>
    </div>
    <Text variant="base" className="text-text-muted">
      {description}
    </Text>
  </div>
);

export default AboutPage;
