"use client";
import React from "react";
import { FolderOpen } from "lucide-react";
import PageHeader from "@/components/PageHeader";

import PageHeading from "@/components/pageHeading";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";

const Dashboard = () => {
  return (
    <div>
      <PageHeader title="Dashboard • DepShield.io" />
      <BreadcrumbWithAvatar initialData="Dashboard" initialLink="/dashboard" />
      <div className="px-3 lg:px-6">
        <PageHeading title="Dashboard" className="pl-2 pt-3" />
        <div className="flex flex-col items-center justify-center h-96">
          <span><FolderOpen size={32} strokeWidth={1} /></span>
          <p className="text-xl">No Data Available</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;