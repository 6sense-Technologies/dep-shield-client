"use client";
import React from "react";
import PageHeader from "@/components/PageHeader";

import { useSession } from "next-auth/react";
import ProfileAvatarSection from "./_components/ProfileAvatarSection";
import CredentialsArea from "./_components/CredentialsArea";
import IntegrationArea from "./_components/IntegrationArea";
import PasswordArea from "./_components/PasswordArea";
import { getInitials } from "@/constants/globalFunctions";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";
import PageHeading from "@/components/pageHeading";

const Profile = () => {
    const session = useSession();
    const defaultAvatarUrl = 'https://via.placeholder.com/150/0000FF/808080?Text=Default+Avatar';

    return (
        <div>
            <PageHeader title="Profile • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Profile" initialLink="/profile" />
            <div className="px-3 lg:px-6">
                <PageHeading title="My Profile" className="pl-2 pt-3" />

                <ProfileAvatarSection
                    defaultAvatarUrl={defaultAvatarUrl}
                    session={session}
                    getInitials={getInitials}
                />

                <CredentialsArea />

                <IntegrationArea
                    email1="aasim124@6sensehq.com"
                    email2="aasim124@6sensehq.com"
                    email3=""
                />

                <PasswordArea />
            </div>
        </div>
    );
};

export default Profile;