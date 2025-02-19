"use client";
import PageTitle from "@/components/PageTitle";
import React, { Suspense } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AvatarMenu from "@/components/AvatarMenu";
import GlobalBreadCrumb from "@/components/globalBreadCrumb";
import PageHeading from "@/components/pageHeading";
import Loader from "@/components/loader";
import AllLicensesSearchArea from "./_components/AllLicensesSearchArea";
import { AllLicensesTable } from "./_components/AllLicensesTable";


const licensesData = [
    {
        name: "Apache-2.0",
        licenseRisk: "Low",
        dependencies: 12,
        licenseFamily: "Permissive",
        affectedRepositories: ["6senseEV/6sense-ev-oc", "pp-server"]
    },
    {
        name: "MIT",
        licenseRisk: "Medium",
        dependencies: 8,
        licenseFamily: "Permissive",
        affectedRepositories: ["repo1", "repo2", "repo3"]
    },
    {
        name: "GPL-3.0",
        licenseRisk: "High",
        dependencies: 5,
        licenseFamily: "Strong Copyleft",
        affectedRepositories: ["repo4"]
    },
    {
        name: "BSD-3-Clause",
        licenseRisk: "Low",
        dependencies: 10,
        licenseFamily: "Permissive",
        affectedRepositories: ["repo5", "repo6"]
    },
    {
        name: "LGPL-2.1",
        licenseRisk: "Medium",
        dependencies: 7,
        licenseFamily: "Weak Copyleft",
        affectedRepositories: ["repo7", "repo8", "repo9"]
    },
    {
        name: "MPL-2.0",
        licenseRisk: "Unknown",
        dependencies: 4,
        licenseFamily: "Weak Copyleft",
        affectedRepositories: ["repo10"]
    }
];


const LicensesContent = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <PageTitle title="Dependencies • DepShield.io" />
            <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
            </div>
            <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                <GlobalBreadCrumb initialData="Dependencies" initalLink="/Dependencies" />
                <span className="hidden md:flex pr-2">
                    <AvatarMenu />
                </span>
            </div>
            <div className="flex items-center pl-4 md:pl-8 pt-3">
                <PageHeading title="All Dependencies" className="mr-4" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6">
                <AllLicensesSearchArea />
                <AllLicensesTable
                    licenses={licensesData}
                    totalCountAndLimit={{ totalCount: licensesData.length, size: 10 }}
                    currentPage={1}
                    loading={false}
                />
            </div>
        </div>
    );
};

const Licenses = () => {
    return (
        <Suspense fallback={<Loader />}>
            <LicensesContent />
        </Suspense>
    );
};

export default Licenses;