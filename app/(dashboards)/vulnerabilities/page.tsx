"use client";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

import VulnerabilitySearhArea from "./_components/vulnerabilitySearhArea";

import VulnerabilityTable from "@/app/(dashboards)/vulnerabilities/_components/VulnerabilityTable";
import { getAllVulnerabilities } from "@/app/(dashboards)/vulnerabilities/queryFn/queryFn";
import { AllVulnerabilitiesType } from "@/app/(dashboards)/vulnerabilities/types/types";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";
import EmptyTableSkeleton from "@/components/emptyTableSkeleton";
import PageHeading from "@/components/pageHeading";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { parseAsInteger, useQueryState } from "nuqs";

const Vulnerabilities = () => {
    const session = useSession();
    const [limit] = useState(2);

    const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

    const {
        data: allVulnerabilities,
        isFetching: allVulnerabilitiesLoading,
        refetch
    } = useQuery<AllVulnerabilitiesType>({
        queryKey: ["allVulnerabilities", session, page, limit],
        queryFn: () => getAllVulnerabilities(session, page, limit)
    });
    console.log(" Vulnerabilities - allVulnerabilitiesLoading:", allVulnerabilitiesLoading);
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader title="Vulnerabilities • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Vulnerabilities" initialLink="/vulnerabilities" />
            <div className="flex items-center pl-4 md:pl-8 pt-3">
                <PageHeading title="All Vulnerabilities" className="mr-4" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6 ">
                <VulnerabilitySearhArea />
                <div className="mt-7">
                    {allVulnerabilitiesLoading ? (
                        <EmptyTableSkeleton />
                    ) : (
                        <VulnerabilityTable allVulnerabilities={allVulnerabilities} page={page} setPage={setPage} limit={limit} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Vulnerabilities;
