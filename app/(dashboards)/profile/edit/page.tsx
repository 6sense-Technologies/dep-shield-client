"use client";
import React from "react";
import PageHeader from "@/components/PageHeader";

import { useSession } from "next-auth/react";
import ProfileAvatarSection from "./_components/ProfileAvatarSection";
import CredentialsArea from "./_components/CredentialsArea";
import { getInitials } from "@/constants/globalFunctions";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";
import PageHeading from "@/components/pageHeading";

const EditProfile = () => {
    const session = useSession();
    const defaultAvatarUrl = 'https://via.placeholder.com/150/0000FF/808080?Text=Default+Avatar';

    return (
        <div>
            <PageHeader title="Edit Profile • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Profile" initialLink="/profile" secondaryData="Edit Profile" secondaryLink="/profile/edit" />
            <div className="px-3 lg:px-6">
                <PageHeading title="Edit Profile" className="pl-2 pt-3" />

                <ProfileAvatarSection
                    defaultAvatarUrl={defaultAvatarUrl}
                    session={session}
                    getInitials={getInitials}
                />

                <CredentialsArea />
            </div>
        </div>
    );
};

export default EditProfile;