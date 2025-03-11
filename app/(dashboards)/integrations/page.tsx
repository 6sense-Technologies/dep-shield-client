/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import PageHeading from "@/components/pageHeading";
import IntegrationArea from "./_components/integrationArea";
import { GitHub_APP_URL } from "@/config";
import { useSession } from "next-auth/react";
import { handleConnection } from "@/helpers/githubApp/githubApi";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";

const IntegrationContent = () => {
    const session = useSession();
    const [connections, setConnections] = useState({
        github: false,
        gitlab: false,
        bitbucket: false,
    });

    const handleConnect = (integration: string, event?: React.MouseEvent) => {
        if (event) {
            event.stopPropagation();
        }

        if (integration === "github") {
            setConnections((prevConnections) => ({
                ...prevConnections,
                [integration]: true,
            }));

            window.location.href = GitHub_APP_URL || "";
        } else {
            setConnections((prevConnections) => ({
                ...prevConnections,
                [integration]: true,
            }));
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

    useEffect(() => {
        if (gitStatus?.isConnected) {
            setConnections((prevConnections) => ({
                ...prevConnections,
                github: true,
            }));
        } else {
            setConnections((prevConnections) => ({
                ...prevConnections,
                github: false,
            }));
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader title="Integrations • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Integrations" initialLink="/integrations" />
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

const Integration = () => {
    return (
        <Suspense fallback={<Loader />}>
            <IntegrationContent />
        </Suspense>
    );
};

export default Integration;