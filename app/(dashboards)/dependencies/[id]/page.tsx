"use client";
import PageTitle from "@/components/PageTitle";
import React, { Suspense, useState, useRef, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AvatarMenu from "@/components/AvatarMenu";
import GlobalBreadCrumb from "@/components/globalBreadCrumb";
import PageHeading from "@/components/pageHeading";
import Loader from "@/components/loader";
import CustomCard from "../../vulnerabilities/[id]/_components/customCard";
import CustomCardWithBadge from "../../vulnerabilities/[id]/_components/customCardWithBadge";
import { SingleDepTable } from "./_components/SingleDepTable";
import DepSearchSection from "./_components/DepSearchSection";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, House } from "lucide-react";
import miniGit from "../../../../public/logo/miniGithub.svg";
import miniNPM from "../../../../public/logo/mininpm.svg";
import Image from "next/image";

const DepData = [
    {
        repositoryName: "CVE-2023-42282",

    },
    {
        repositoryName: "CVE-2023-42283",

    },
    {
        repositoryName: "CVE-2023-42284",

    },
    {
        repositoryName: "CVE-2023-42285",

    },
    {
        repositoryName: "CVE-2023-42286",
    },
    {
        repositoryName: "CVE-2023-42287",
    },
    {
        repositoryName: "CVE-2023-42288",

    },
    {
        repositoryName: "CVE-2023-42289",

    },
    {
        repositoryName: "CVE-2023-42290",

    },
    {
        repositoryName: "CVE-2023-42291",

    }
];

const DependenciesDetailsContent = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <PageTitle title="@types/react (npm) Details • Dependencies • DepShield.io" />
            <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
            </div>
            <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                <GlobalBreadCrumb initialData="Dependencies" initalLink="/dependencies" secondayData="Details" secondayLink="/dependencies/12" />
                <span className="hidden md:flex pr-2">
                    <AvatarMenu />
                </span>
            </div>
            <div className="flex items-center pl-4 md:pl-8 pt-3">
                <PageHeading title="@types/react (npm)" className="mr-4" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6 hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <CustomCard bgColor="bg-[#F1F5F9]" Heading="January 23, 2025" subheading="Last Published" />
                <CustomCardWithBadge bgColor="bg-[#F1F5F9]" Heading="MIT" subheading="License" icon={true} />
                <CustomCard bgColor="bg-[#DCFCE7]" Heading="82" subheading="Popularity" />
                <CustomCard bgColor="bg-[#FDEBDD]" Heading="69" subheading="Contributors" />
                <CustomCard bgColor="bg-[#FDEBDD]" Heading="46" subheading="Security" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6 grid grid-cols-1 lg:hidden gap-4">
                <div className="lg:hidden grid grid-cols-2 gap-4">
                    <CustomCard bgColor="bg-[#F1F5F9]" Heading="January 23, 2025" subheading="Last Published" />
                    <CustomCardWithBadge bgColor="bg-[#F1F5F9]" Heading="MIT" subheading="License" icon={true} />
                </div>
                <div className="lg:hidden grid grid-cols-3 gap-4">
                    <CustomCard bgColor="bg-[#DCFCE7]" Heading="82" subheading="Popularity" />
                    <CustomCard bgColor="bg-[#FDEBDD]" Heading="69" subheading="Contributors" />
                    <CustomCard bgColor="bg-[#FDEBDD]" Heading="46" subheading="Security" />
                </div>
            </div>

            <div className="pt-6 px-4 md:pt-6 md:px-6 flex ">
                <p className="text-sm font-normal text-deepBlackColor mt-2 mr-5">Current Version</p>
                <div className="flex items-center gap-3 mt-1">
                    <div className="mr-4">
                        <Badge className="inline-flex items-center gap-1 bg-white text-black hover:bg-white text-nowrap font-normal">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-twelve font-normal text-deepBlackColor">18.2.21</span> <ExternalLink size={14} className="mb-[2px]" />
                            </div>
                        </Badge>
                    </div>

                    <div className="mt-1 flex items-center gap-3">
                        <span className="flex text-twelve font-normal text-deepBlackColor gap-x-[6px]"><House size={14} />
                            Homepage
                        </span>

                        <span className="flex text-twelve font-normal text-deepBlackColor gap-x-[6px]"><Image src={miniGit} alt="miniGitLogo" width={14} />
                            GitHub
                        </span>


                        <span className="flex text-twelve font-normal text-deepBlackColor gap-x-[6px]"><Image src={miniNPM} alt="mini-NPM-Logo" width={14} />
                            NPM
                        </span>
                    </div>

                </div>
            </div>

            <div className="pt-6 px-4 md:pt-6 md:px-6">
                <div className="flex items-center gap-2 border-b pb-4">
                    <p className="font-medium text-[16px] text-deepBlackColor">Repositories</p>
                </div>
                <div>
                    <DepSearchSection />
                    <SingleDepTable
                        repos={DepData ?? []}
                        totalCountAndLimit={{ totalCount: DepData.length, size: 10 }}
                        currentPage={1}
                        loading={false}

                    />

                </div>
            </div>
        </div>
    );
};

const DependenciesDetails = () => {
    return (
        <Suspense fallback={<Loader />}>
            <DependenciesDetailsContent />
        </Suspense>
    );
};

export default DependenciesDetails;