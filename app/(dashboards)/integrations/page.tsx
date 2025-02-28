"use client";
import PageTitle from "@/components/PageTitle";
import React, { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AvatarMenu from "@/components/AvatarMenu";
import GlobalBreadCrumb from "@/components/globalBreadCrumb";
import PageHeading from "@/components/pageHeading";
import IntegrationArea from "./_components/integrationArea";
import { GitHub_APP_URL } from "@/config";
import { useSession } from "next-auth/react";
import { handleConnection } from "@/helpers/githubApp/githubApi";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";

const Dashboard = () => {
    const session = useSession();
    const [connections, setConnections] = useState({
        github: false,
        gitlab: false,
        bitbucket: false,
    });

    const handleConnect = (integration: string, event?: MouseEvent) => {
        if (event) {
            event.stopPropagation();
        }

        if (event && integration === "github") {
            setConnections((prevConnections) => ({
                ...prevConnections,
                [integration]: false,
            }));

            window.location.href = GitHub_APP_URL || "";
        }

        else {
            setConnections((prevConnections) => ({
                ...prevConnections,
                [integration]: true,
            }));

            window.location.href = GitHub_APP_URL || "";
        }
    };

    const handleDisconnect = (integration: string) => {
        setConnections((prevConnections) => ({
            ...prevConnections,
            [integration]: false,
        }));
    };

    let accessToken = null;

    if (session?.status === 'authenticated') {
        accessToken = session?.data?.accessToken;
    }

    const {
        data: gitStatus,
        isFetching: isFetchingGitStatus,
        isLoading: isGitStatusLoading,
        refetch: refetchGitStatus,
    } = useQuery<any>({
        queryKey: ["gitStatus"],
        queryFn: () => handleConnection(accessToken as string),
        enabled: !!accessToken,
    });

    console.log("Git Status in Int page", gitStatus?.isConnected);
    return (
        <div className="flex flex-col min-h-screen">
            <PageTitle title="Integrations • DepShield.io" />
            <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
            </div>
            <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                <GlobalBreadCrumb initialData="Integrations" initalLink="/integrations" />
                <span className="hidden md:flex pr-2">
                    <AvatarMenu />
                </span>
            </div>
            <PageHeading title="All Integrations" className="pl-4 md:pl-7 pt-3" />
            {(isGitStatusLoading || isFetchingGitStatus) ? (<Loader />) : (
                <IntegrationArea
                    connections={connections}
                    handleConnect={handleConnect}
                    handleDisconnect={handleDisconnect}
                    gitStatus={gitStatus?.isConnected}
                    refetchGitStatus={refetchGitStatus}
                />
            )}
        </div>
    );
};

export default Dashboard;