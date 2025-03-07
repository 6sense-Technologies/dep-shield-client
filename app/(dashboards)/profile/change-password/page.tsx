"use client";
import React from "react";
import PageHeader from "@/components/PageHeader";

import { useSession } from "next-auth/react";
import PasswordCredentialsArea from "./_components/PasswordCredentialArea";
import ProfileAvatarSection from "./_components/ProfileAvatarSection";
import { getInitials } from "@/constants/globalFunctions";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";
import PageHeading from "@/components/pageHeading";

const ChangePassword = () => {
    const session = useSession();
    const defaultAvatarUrl = 'https://via.placeholder.com/150/0000FF/808080?Text=Default+Avatar';

    return (
        <div>
            <PageHeader title="Change Password • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Profile" initialLink="/profile" secondaryData="Change Password" secondaryLink="/profile/change-password" />
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

export default ChangePassword;