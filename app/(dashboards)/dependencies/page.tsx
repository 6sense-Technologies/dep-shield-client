"use client";
import PageTitle from "@/components/PageTitle";
import React, { Suspense } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AvatarMenu from "@/components/AvatarMenu";
import GlobalBreadCrumb from "@/components/globalBreadCrumb";
import PageHeading from "@/components/pageHeading";
import Loader from "@/components/loader";
import DependenciesSearchArea from "./_components/DependenciesSearchArea";
import { AllDependenciesTable } from "./_components/AllDependenciesTable";

const dependenciesData = [
    {
        name: "aio-pika (pip)",
        totalVulnerabilities: 5,
        vulnerabilityPriority: ["Critical", "High"],
        licenses: "Apache-2.0",
        health: {
            popularity: 85,
            contribution: 70
        }
    },
    {
        name: "requests (pip)",
        totalVulnerabilities: 3,
        vulnerabilityPriority: ["Medium", "Low"],
        licenses: "MIT",
        health: {
            popularity: 90,
            contribution: 60
        }
    },
    {
        name: "express (npm)",
        totalVulnerabilities: 7,
        vulnerabilityPriority: ["High", "Medium"],
        licenses: "MIT",
        health: {
            popularity: 75,
            contribution: 50
        }
    },
    {
        name: "lodash (npm)",
        totalVulnerabilities: 2,
        vulnerabilityPriority: ["Low", "-"],
        licenses: "MIT",
        health: {
            popularity: 95,
            contribution: 80
        }
    },
    {
        name: "django (pip)",
        totalVulnerabilities: 4,
        vulnerabilityPriority: ["Critical", "Unknown"],
        licenses: "BSD-3-Clause",
        health: {
            popularity: 80,
            contribution: 65
        }
    },
    {
        name: "react (npm)",
        totalVulnerabilities: 1,
        vulnerabilityPriority: ["Low", "-"],
        licenses: "MIT",
        health: {
            popularity: 98,
            contribution: 85
        }
    }
];
const DependenciesContent = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <PageTitle title="Dependencies • DepShield.io" />
            <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
            </div>
            <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                <GlobalBreadCrumb initialData="Dependencies" initalLink="/dependencies" />
                <span className="hidden md:flex pr-2">
                    <AvatarMenu />
                </span>
            </div>
            <div className="flex items-center pl-4 md:pl-8 pt-3">
                <PageHeading title="All Dependencies" className="mr-4" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6">
                <DependenciesSearchArea />
                <AllDependenciesTable
                    dependencies={dependenciesData}
                    totalCountAndLimit={{ totalCount: dependenciesData.length, size: 10 }}
                    currentPage={1}
                    loading={false}
                />
            </div>
        </div>
    );
};

const Dependencies = () => {
    return (
        <Suspense fallback={<Loader />}>
            <DependenciesContent />
        </Suspense>
    );
};

export default Dependencies;