"use client";
import PageHeader from "@/components/PageHeader";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import CustomStepper from "./_components/CustomStepper";
import CustomSummary from "./_components/CustomSummary";
import CustomCard from "./_components/customCard";
import CustomCardWithBadge from "./_components/customCardWithBadge";

import SeverityTabs from "@/app/(dashboards)/vulnerabilities/[id]/_components/SeverityTabs";
import { getVulnerabilityDetails } from "@/app/(dashboards)/vulnerabilities/queryFn/queryFn";
import { VulnerabilityDetailsType } from "@/app/(dashboards)/vulnerabilities/types/types";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";
import PageHeading from "@/components/pageHeading";
import { RepoData } from "@/constants/DummyDataFactory";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useQueryState } from "nuqs";
import RepoSearchSection from "./_components/RepoSearchSection";
import { SingleRepoTable } from "./_components/SingleRepoTable";
import CustomRadialGraph from "@/app/(dashboards)/vulnerabilities/[id]/_components/CustomRadialGraph";

const chartData = [
    { browser: "safari", visitors: 3.7, fill: "" },
];

const VulnerabilitiesDetailsContent = () => {

    const { id: vulnerabilityId } = useParams();

    const session = useSession();
    const [activeTab, setActiveTab] = useQueryState('0');
    const [showMoreNVD, setShowMoreNVD] = useState(false);
    const [showMoreGitHub, setShowMoreGitHub] = useState(false);
    const [isNVDOverflowing, setIsNVDOverflowing] = useState(false);
    const [isGitHubOverflowing, setIsGitHubOverflowing] = useState(false);


    const nvdRef = useRef<HTMLParagraphElement>(null);
    const githubRef = useRef<HTMLParagraphElement>(null);

    const { data: vulnerabilityDetails, isFetching: vulnerabilityDetailsLoading } = useQuery<VulnerabilityDetailsType>({
        queryKey: ["vulnerabilityDetails", session, vulnerabilityId],
        queryFn: () => getVulnerabilityDetails(session, vulnerabilityId as string),
        enabled: !!vulnerabilityId
    });

    useEffect(() => {
        if (nvdRef.current && nvdRef.current.scrollHeight > 120) {
            setIsNVDOverflowing(true);
        }
        if (githubRef.current && githubRef.current.scrollHeight > 120) {
            setIsGitHubOverflowing(true);
        }
    }, []);

    console.log('Object.keys(vulnerabilityDetails?.severity)?.toReversed()', Object.keys(vulnerabilityDetails?.severity ?? {})?.toReversed());

    if (vulnerabilityDetailsLoading) return <Loader />

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader title="CVE-2023-42282 Details • Vulnerabilities • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Vulnerabilities" initialLink="/vulnerabilities" secondaryData="Details" secondaryLink="/vulnerabilities/12" />
            <div className="flex items-center pl-4 md:pl-8 pt-3">
                <PageHeading title="CVE-2023-42282" className="mr-4" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6 hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <CustomCard bgColor="bg-[#F1F5F9]" Heading={dayjs(vulnerabilityDetails?.published).format("MMMM DD, YYYY")} subheading="Discovered" />
                <CustomCardWithBadge bgColor="bg-[#F1F5F9]" Heading={vulnerabilityDetails?.dependencyName ?? '-'} subheading="Dependency" />
                <CustomCard bgColor="bg-[#DCFCE7]" Heading="N/A" subheading="CVSS3 - Critical" />
                <CustomCard bgColor="bg-[#DDF3FD]" Heading="N/A" subheading="CVSS2 - Medium" />
                <CustomCard bgColor="bg-[#F1F5F9]" Heading="N/A" subheading="CISA KEV" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6 grid grid-cols-1 lg:hidden gap-4">
                <div className="lg:hidden grid grid-cols-2 gap-4">
                    <CustomCard bgColor="bg-[#F1F5F9]" Heading="January 24, 2025" subheading="Discovered" />
                    <CustomCardWithBadge bgColor="bg-[#F1F5F9]" Heading="log4j (Maven)" subheading="Dependency" />
                </div>
                <div className="lg:hidden grid grid-cols-3 gap-4">
                    <CustomCard bgColor="bg-[#DCFCE7]" Heading="N/A" subheading="CVSS3 - Critical" />
                    <CustomCard bgColor="bg-[#DDF3FD]" Heading="N/A" subheading="CVSS2 - Medium" />
                    <CustomCard bgColor="bg-[#F1F5F9]" Heading="N/A" subheading="CISA KEV" />
                </div>
            </div>

            <CustomSummary
                nvdRef={nvdRef}
                githubRef={githubRef}
                showMoreNVD={showMoreNVD}
                showMoreGitHub={showMoreGitHub}
                isNVDOverflowing={isNVDOverflowing}
                isGitHubOverflowing={isGitHubOverflowing}
                setShowMoreNVD={setShowMoreNVD}
                setShowMoreGitHub={setShowMoreGitHub}
                vulnerabilityDetails={vulnerabilityDetails}
            />

            <div className="pt-6 px-4 md:pt-6 md:px-6">
                <div className="flex items-center gap-2 border-b pb-4">
                    <p className="font-medium text-[16px] text-deepBlackColor">Vulnerable dependency</p>

                    <Badge className="inline-flex items-center gap-1 bg-transparent text-black px-2 py-1 rounded-xl hover:bg-transparent cursor-pointer">
                        {vulnerabilityDetails?.dependencyName ?? '-'}
                        <ExternalLink size={16} className='ml-[6px]' />
                    </Badge>
                </div>
                <div className="flex items-center justify-start mt-10">
                    {
                        !vulnerabilityDetailsLoading ?
                            <CustomStepper history={vulnerabilityDetails?.vulnerabilityHistory} /> : null
                    }
                </div>
                <SeverityTabs
                    vulnerabilityDetails={vulnerabilityDetails}
                    severity={vulnerabilityDetails?.severity}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <div>
                    {/* <div className="pt-4">
                        <div className="flex space-x-2 md:space-x-4 border-b">
                            <button
                                className={`py-2 px-4 ${activeTab === 'cv' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                                onClick={() => handleTabChange('cv')}
                            >
                                CVSS2 - 6.8
                            </button>
                            <button
                                className={`py-2 px-4 text-nowrap ${activeTab === 'cvv' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                                onClick={() => handleTabChange('cvv')}
                            >
                                CVSS2 - 6.8
                            </button>
                        </div>
                    </div> */}
                    <div>
                        {/* {activeTab === 'cv' && (
                            <div>
                                <FristTabTable
                                    data={firstTabData}
                                />
                            </div>
                        )} */}
                        {/* {activeTab === 'cvv' && ( */}
                        {/* <div className="pt-4 flex flex-col flex-wrap items-center lg:items-start lg:flex-row gap-6 2xl:gap-44 pb-8">
                                <SecondTabTable data={secondTabData} />
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <CustomRadialGraph
                                        chartData={chartData}
                                        heading="Base Score"
                                        subHeading="Max - 10"
                                    />
                                    <CustomRadialGraph
                                        chartData={chartData}
                                        heading="Exploitability"
                                        subHeading="Max - 3.9"
                                    />
                                    <CustomRadialGraph
                                        chartData={chartData}
                                        heading="Impact"
                                        subHeading="Max -6.0"
                                    />
                                </div>
                            </div> */}
                        {/* )} */}
                    </div>
                </div>
            </div>

            <div className="pt-6 px-4 md:pt-6 md:px-6">
                <div className="flex items-center gap-2 border-b pb-4">
                    <p className="font-medium text-[16px] text-deepBlackColor">Repositories</p>
                </div>
                <div>
                    <RepoSearchSection />
                    <SingleRepoTable
                        repos={RepoData ?? []}
                        totalCountAndLimit={{ totalCount: RepoData.length, size: 10 }}
                        currentPage={1}
                        loading={false}
                    />
                </div>
            </div>
        </div>
    );
};

const VulnerabilitiesDetails = () => {
    return (
        <Suspense fallback={<Loader />}>
            <VulnerabilitiesDetailsContent />
        </Suspense>
    );
};

export default VulnerabilitiesDetails;