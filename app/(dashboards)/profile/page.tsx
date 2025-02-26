"use client";
import PageTitle from "@/components/PageTitle";
import React, { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AvatarMenu from "@/components/AvatarMenu";
import GlobalBreadCrumb from "@/components/globalBreadCrumb";
import PageHeading from "@/components/pageHeading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import ProfileAvatarSection from "./_components/ProfileAvatarSection";
import CredentialsArea from "./_components/CredentialsArea";
import IntegrationArea from "./_components/IntegrationArea";
import PasswordArea from "./_components/PasswordArea";

const Dashboard = () => {

    const session = useSession();
    const defaultAvatarUrl = 'https://via.placeholder.com/150/0000FF/808080?Text=Default+Avatar';
    const [connections, setConnections] = useState({
        github: false,
        gitlab: false,
        bitbucket: false,
    });

    const handleConnect = (integration: string) => {
        setConnections((prevConnections) => ({
            ...prevConnections,
            [integration]: true,
        }));
    };

    const getInitials = (name: string) => {
        if (!name) return "NA";
        const parts = name.split(" ");
        if (parts.length === 1) {
            return parts[0][0].toUpperCase();
        }
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };


    return (
        <div>
            <PageTitle
                title="Profile • DepShield.io"
            />
            <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
            </div>
            <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                <GlobalBreadCrumb
                    initialData="Profile"
                    initalLink="/profile"
                />
                <span className="hidden md:flex pr-2">
                    <AvatarMenu />
                </span>
            </div>
            <div className="px-3 lg:px-6">
                <PageHeading title="My Profile" className="pl-2 pt-3" />

                <ProfileAvatarSection
                    defaultAvatarUrl={defaultAvatarUrl}
                    session={session}
                    getInitials={getInitials}
                />

                <CredentialsArea/>

                <IntegrationArea
                    connections={connections}
                    handleConnect={handleConnect}
                    githubEmail="aasim124@6sensehq.com"
                    gitlabEmail="aasim124@6sensehq.com"
                    bitbucketEmail="aasim124@6sensehq.com"
                />

                <PasswordArea/>   

            </div>
        </div>
    );
};

export default Dashboard;
