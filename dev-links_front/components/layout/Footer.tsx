import React from "react";
import Text from "../ui/Text";

const Footer: React.FC = () => {
  return (
    <div>
      <div className="mt-5 w-full py-5 bg-black text-center">
        <Text variant="small" className="text-white">
          © 2024 DevLinks. All rights reserved.
        </Text>
      </div>
    </div>
  );
};

export default Footer;
