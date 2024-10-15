"use client";

import React from "react";

import LinksCard from "@/components/common/LinksCard";
import Links from "@/components/links/Links";

const page = () => {
  return (
    <div className="grid gap-5 grid-cols-12">
      <LinksCard />
      <Links />
    </div>
  );
};

export default page;
