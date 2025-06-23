"use client";
import React, { Suspense } from "react";
import PageHeader from "@/components/PageHeader";

import Loader from "@/components/loader";
import VulnerabilitySearhArea from "./_components/vulnerabilitySearhArea";
import { VulnerabilityTable } from "../repositories/[id]/details/_components/VulnabilitiesTable";
import { vulnerabilitiesData } from "@/constants/DummyDataFactory";
import PageHeading from "@/components/pageHeading";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";

const VulnerabilitiesContent = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader title="Vulnerabilities • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Vulnerabilities" initialLink="/vulnerabilities" />
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