"use client";
import PageTitle from "@/components/PageTitle";
import React  from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AvatarMenu from "@/components/AvatarMenu";
import GlobalBreadCrumb from "@/components/globalBreadCrumb";
import PageHeading from "@/components/pageHeading";
import { useSession } from "next-auth/react";
import PasswordCredentialsArea from "./_components/PasswordCredentialArea";
import ProfileAvatarSection from "./_components/ProfileAvatarSection";
import { getInitials } from "@/constants/globalFunctions";



const EditProfile = () => {
    const session = useSession();
    const defaultAvatarUrl = 'https://via.placeholder.com/150/0000FF/808080?Text=Default+Avatar';



    return (
        <div>
            <PageTitle title="Change Password • DepShield.io" />
            <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
            </div>
            <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                <GlobalBreadCrumb initialData="Profile" initalLink="/profile"
                    secondayData="Change Password" secondayLink="/profile/change-password"
                />
                <span className="hidden md:flex pr-2">
                    <AvatarMenu />
                </span>
            </div>
            <div className="px-3 lg:px-6">
                <PageHeading title="Change Password" className="pl-2 pt-3" />

                <ProfileAvatarSection
                    defaultAvatarUrl={defaultAvatarUrl}
                    session={session}
                    getInitials={getInitials}
                />

                <PasswordCredentialsArea />

            </div>
        </div>
    );
};

export default EditProfile;