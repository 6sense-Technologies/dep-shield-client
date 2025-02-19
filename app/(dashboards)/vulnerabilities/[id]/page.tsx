"use client";
import PageTitle from "@/components/PageTitle";
import React, { Suspense, useState, useRef, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AvatarMenu from "@/components/AvatarMenu";
import GlobalBreadCrumb from "@/components/globalBreadCrumb";
import PageHeading from "@/components/pageHeading";
import Loader from "@/components/loader";
import CustomCard from "./_components/customCard";
import CustomCardWithBadge from "./_components/customCardWithBadge";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CustomStepper from "./_components/CustomStepper";
import CustomSummary from "./_components/CustomSummary";
import SecondTabTable from "./_components/secondTabTable";
import CustomRadialGraph from "./_components/CustomRadialGraph";
import FristTabTable from "./_components/FirstTabTable";
import { ChartConfig } from "@/components/ui/chart";
import RepoSearchSection from "./_components/RepoSearchSection";
import { SingleRepoTable } from "./_components/SingleRepoTable";

const RepoData = [
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

const secondTabData = [
    { key: "Attack Vector", value: "Network" },
    { key: "Attack Complexity", value: "Medium" },
    { key: "Privileges Required", value: "None" },
    { key: "User Interaction", value: "Required" },
    { key: "Scope", value: "Unchanged" },
    { key: "Confidentiality Impact", value: "High" },
    { key: "Integrity Impact", value: "High" },
    { key: "Availability Impact", value: "High" },
];

const chartData = [
    { browser: "safari", visitors: 3.7, fill: "var(--color-safari)" },
];




const VulnerabilitiesDetailsContent = () => {
    const [activeTab, setActiveTab] = useState('cv');
    const [showMoreNVD, setShowMoreNVD] = useState(false);
    const [showMoreGitHub, setShowMoreGitHub] = useState(false);
    const [isNVDOverflowing, setIsNVDOverflowing] = useState(false);
    const [isGitHubOverflowing, setIsGitHubOverflowing] = useState(false);

    const nvdRef = useRef<HTMLParagraphElement>(null);
    const githubRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (nvdRef.current && nvdRef.current.scrollHeight > 120) {
            setIsNVDOverflowing(true);
        }
        if (githubRef.current && githubRef.current.scrollHeight > 120) {
            setIsGitHubOverflowing(true);
        }
    }, []);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);
    };

    useEffect(() => {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            setActiveTab(savedTab);
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <PageTitle title="Vulnerabilities • DepShield.io" />
            <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
            </div>
            <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                <GlobalBreadCrumb initialData="Vulnerabilities" initalLink="/vulnerabilities" secondayData="Details" secondayLink="/vulnerabilities/12" />
                <span className="hidden md:flex pr-2">
                    <AvatarMenu />
                </span>
            </div>
            <div className="flex items-center pl-4 md:pl-8 pt-3">
                <PageHeading title="CVE-2023-42282" className="mr-4" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6 hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <CustomCard bgColor="bg-[#F1F5F9]" Heading="January 24, 2025" subheading="Discovered" />
                <CustomCardWithBadge bgColor="bg-[#F1F5F9]" Heading="log4j (Maven)" subheading="Dependency" />
                <CustomCard bgColor="bg-[#DCFCE7]" Heading="3.7" subheading="CVSS3 - Critical" />
                <CustomCard bgColor="bg-[#DDF3FD]" Heading="4.3" subheading="CVSS2 - Medium" />
                <CustomCard bgColor="bg-[#F1F5F9]" Heading="N/A" subheading="CISA KEV" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6 grid grid-cols-1 lg:hidden gap-4">
                <div className="lg:hidden grid grid-cols-2 gap-4">
                    <CustomCard bgColor="bg-[#F1F5F9]" Heading="January 24, 2025" subheading="Discovered" />
                    <CustomCardWithBadge bgColor="bg-[#F1F5F9]" Heading="log4j (Maven)" subheading="Dependency" />
                </div>
                <div className="lg:hidden grid grid-cols-3 gap-4">
                    <CustomCard bgColor="bg-[#DCFCE7]" Heading="3.7" subheading="CVSS3 - Critical" />
                    <CustomCard bgColor="bg-[#DDF3FD]" Heading="4.3" subheading="CVSS2 - Medium" />
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
            />

            <div className="pt-6 px-4 md:pt-6 md:px-6">
                <div className="flex items-center gap-2 border-b pb-4">
                    <p className="font-medium text-[16px] text-deepBlackColor">Vulnerable dependency</p>

                    <Badge className="inline-flex items-center gap-1 bg-transparent text-black px-2 py-1 rounded-xl hover:bg-transparent">
                        log4j (Maven)
                        <ExternalLink size={16} className='ml-[6px]' />
                    </Badge>
                </div>
                <div className="flex items-center justify-start mt-10">
                    <CustomStepper />
                </div>
                <div>
                    <div className="pt-4">
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
                    </div>
                    <div>
                        {activeTab === 'cv' && (
                            <div>
                                <FristTabTable
                                    data={secondTabData}
                                />
                            </div>
                        )}
                        {activeTab === 'cvv' && (
                            <div className="pt-4 flex flex-col flex-wrap items-center lg:items-start lg:flex-row gap-20 pb-8">
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
                            </div>
                        )}
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