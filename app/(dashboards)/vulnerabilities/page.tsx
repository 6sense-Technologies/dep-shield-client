"use client";
import PageTitle from "@/components/PageTitle";
import React, { Suspense } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AvatarMenu from "@/components/AvatarMenu";
import GlobalBreadCrumb from "@/components/globalBreadCrumb";
import PageHeading from "@/components/pageHeading";
import Loader from "@/components/loader";
import VulnerabilitySearhArea from "./_components/vulnerabilitySearhArea";
import { VulnerabilityTable } from "../repositories/[id]/details/_components/VulnabilitiesTable";

const vulnerabilitiesData = [
    {
        name: "CVE-2023-42282",
        discovered: "24-01-2025",
        severity: "Critical",
        dependency: "follow-redirects (npm)",
        exploited: "NO"
    },
    {
        name: "CVE-2023-42283",
        discovered: "25-01-2025",
        severity: "Critical",
        dependency: "lp (npm)",
        exploited: "NO"
    },
    {
        name: "CVE-2023-42284",
        discovered: "26-01-2025",
        severity: "Low",
        dependency: "lp (npm)",
        exploited: "YES"
    },
    {
        name: "CVE-2023-42285",
        discovered: "27-01-2025",
        severity: "High",
        dependency: "mongoose (npm)",
        exploited: "YES"
    },
    {
        name: "CVE-2023-42286",
        discovered: "28-01-2025",
        severity: "Medium",
        dependency: "traverse (npm)",
        exploited: "YES"
    },
    {
        name: "CVE-2023-42287",
        discovered: "29-01-2025",
        severity: "Unknown",
        dependency: "cross-spawn (npm)",
        exploited: "NO"
    },
    {
        name: "CVE-2023-42288",
        discovered: "30-01-2025",
        severity: "Critical",
        dependency: "express (npm)",
        exploited: "NO"
    },
    {
        name: "CVE-2023-42289",
        discovered: "31-01-2025",
        severity: "High",
        dependency: "react (npm)",
        exploited: "YES"
    },
    {
        name: "CVE-2023-42290",
        discovered: "01-02-2025",
        severity: "Medium",
        dependency: "axios (npm)",
        exploited: "NO"
    },
    {
        name: "CVE-2023-42291",
        discovered: "02-02-2025",
        severity: "Low",
        dependency: "lodash (npm)",
        exploited: "YES"
    }
];

const VulnerabilitiesContent = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <PageTitle title="Vulnerabilities • DepShield.io" />
            <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
            </div>
            <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                <GlobalBreadCrumb initialData="Vulnerabilities" initalLink="/vulnerabilities" />
                <span className="hidden md:flex pr-2">
                    <AvatarMenu />
                </span>
            </div>
            <div className="flex items-center pl-4 md:pl-8 pt-3">
                <PageHeading title="All Vulnerabilities" className="mr-4" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6">
                <VulnerabilitySearhArea />
                <VulnerabilityTable
                    vulnerabilities={vulnerabilitiesData}
                    totalCountAndLimit={{ totalCount: vulnerabilitiesData.length, size: 10 }}
                    currentPage={1}
                    loading={false}
                />
            </div>
        </div>
    );
};

const Vulnerabilities = () => {
    return (
        <Suspense fallback={<Loader />}>
            <VulnerabilitiesContent />
        </Suspense>
    );
};

export default Vulnerabilities;