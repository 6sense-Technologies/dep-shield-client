"use client";
import PageTitle from "@/components/PageTitle";
import React, { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AvatarMenu from "@/components/AvatarMenu";
import GlobalBreadCrumb from "@/components/globalBreadCrumb";
import PageHeading from "@/components/pageHeading";
import IntegrationArea from "./_components/integrationArea";



const Dashboard = () => {
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

    const handleDisconnect = (integration: string) => {
        setConnections((prevConnections) => ({
            ...prevConnections,
            [integration]: false,
        }));
    };

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
            <IntegrationArea
                connections={connections}
                handleConnect={handleConnect}
                handleDisconnect={handleDisconnect}
            />
        </div>
    );
};

export default Dashboard;