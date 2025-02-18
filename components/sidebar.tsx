"use client";
import React, { FC } from "react";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useRouter } from "next/navigation";
import Loader from "./loader";
import { useSession } from "next-auth/react";

type TSidebarprop = {
  children: React.ReactNode;
};

const Sidebar: FC<TSidebarprop> = ({ children }) => {
  const session = useSession();
  const router = useRouter();

//   if (
//     session.status === "authenticated" &&
//     session.data?.isVerified &&
//     session.data?.hasOrganization
//   ) {
    return (
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <div className="w-full md:max-w-[calc(100%-260px)] md:relative md:left-[256px]">
            {children}
          </div>
        </div>
      </SidebarProvider>
    );
//   }
//   if (
//     session.status === "authenticated" &&
//     !session.data?.isVerified &&
//     !session.data?.hasOrganization
//   ) {
//     router.push("/sign-up/verification");
//     return <Loader />;
//   }
//   if (
//     session.status === "authenticated" &&
//     session.data?.isVerified &&
//     !session.data?.hasOrganization
//   ) {
//     router.push("/sign-up/create-organization");
//     return <Loader />;
//   } else if (session.status == "unauthenticated") {
//     router.push("/sign-in");
//     return <Loader />;
//   } 
};

export default Sidebar;
