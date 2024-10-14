import React from "react";

interface LinkItemProps {
  platform: string;
  url: string;
}

const LinkItems: React.FC<LinkItemProps> = ({ platform, url }) => {
  return (
    <div>
      <p>Platform: {platform}</p>
      <p>URL: {url}</p>
    </div>
  );
};

export default LinkItems;
