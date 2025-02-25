"use client";
import PageTitle from "@/components/PageTitle";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AvatarMenu from "@/components/AvatarMenu";
import GlobalBreadCrumb from "@/components/globalBreadCrumb";
import PageHeading from "@/components/pageHeading";
import { FolderOpen } from "lucide-react";

const Dashboard = () => {
  // const session = useSession();

  // console.log("Session Data", session.data);

  return (
    <div>
      <PageTitle
        title="Dashboard • DepShield.io"
      />
      <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
      <span className="md:hidden"><SidebarTrigger /></span>
        <AvatarMenu />
      </div>
      <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
        <GlobalBreadCrumb
          initialData="Dashboard"
          initalLink="/dashboard"
        />
        <span className="hidden md:flex pr-2">
          <AvatarMenu />
          </span>
        </div>
      <div className="px-3 lg:px-6">
      <PageHeading title="Dashboard" className="pl-2 pt-3" />

        <div className="flex flex-col items-center justify-center h-96">
          <span><FolderOpen size={32} strokeWidth={1}/></span>
          <p className="text-xl">No Data Available</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
