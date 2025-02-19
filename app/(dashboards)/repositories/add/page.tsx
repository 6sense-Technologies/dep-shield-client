"use client";
import PageTitle from "@/components/PageTitle";
import React, { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AvatarMenu from "@/components/AvatarMenu";
import GlobalBreadCrumb from "@/components/globalBreadCrumb";
import PageHeading from "@/components/pageHeading";
import EmptyAddRepoView from "./_components/EmptyAddRepoView";
import { AddRepoTable } from "./_components/AddRepoTable";
import Image from "next/image";
import Github from "../../../../public/logo/grayGithub.svg";
import AddRepoSearchArea from "./_components/AddRepoSearchArea";

const AddRepository = () => {
    const addRepoData = [
        {
            name: "6senseEV/6sense-ev-admin",
            useCase: "Non-distributed"
        },
        {
            name: "6senseEV/6sense-ev-frontend",
            useCase: "Distributed"
        },
        {
            name: "6senseEV/6sense-ev-backend",
            useCase: "Unknown"
        },
        {
            name: "6senseEV/6sense-ev-analytics",
            useCase: "Non-distributed"
        },
        {
            name: "6senseEV/6sense-ev-mobile",
            useCase: "Distributed"
        },
        {
            name: "6senseEV/6sense-ev-database",
            useCase: "Unknown"
        }
    ];

    const hasData = addRepoData.length > 0;

    return (
        <div className="flex flex-col min-h-screen">
            <PageTitle title="Add • Repositories • DepShield.io" />
            <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
            </div>
            <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                <GlobalBreadCrumb initialData="Integrations" initalLink="/integrations" secondayData="Add Repositories" secondayLink="/repositories/add" />
                <span className="hidden md:flex pr-2">
                    <AvatarMenu />
                </span>
            </div>
            <div className="flex items-center pl-4 md:pl-7 pt-3">
                <PageHeading title="Add Repositories" className="mr-4" />
                {hasData && <Image src={Github} alt="GitHub Logo" width={20} height={20} />}
            </div>
            {hasData ? (
                <div className="pt-4 px-4 md:pt-4 md:px-6">
                    <>
                        <AddRepoSearchArea />
                        <AddRepoTable repositories={addRepoData}
                            totalCountAndLimit={{ totalCount: addRepoData.length, size: 10 }}
                            currentPage={1}
                            loading={false}
                        />
                    </>
                </div>
            ) : (
                <EmptyAddRepoView />
            )}
        </div>
    );
};

export default AddRepository;