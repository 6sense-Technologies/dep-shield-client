'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AvatarMenu from '@/components/AvatarMenu';
import GlobalBreadCrumb from '@/components/globalBreadCrumb';
import PageTitle from '@/components/PageTitle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import PageHeadingWithDeleteButton from './_components/PageHeadingWithDeleteButton';
import VulnabalitiesSearchArea from './_components/vulnabilitiesSearchArea';
import Loader from '@/components/loader';
import { VulnerabilityTable } from './_components/VulnabilitiesTable';
import PageHeadingHover from './_components/PageHeadingHover';
import DependenciesSearchArea from './_components/DependenciesSearchArea';
import { DependenciesTable } from './_components/DependencyTable';
import LicensesSearchArea from './_components/LicensesSearchArea';
import { LicensesTable } from './_components/LicensesTable';

const SearchParamsWrapper = ({ children }: { children: (params: URLSearchParams) => React.ReactNode }) => {
    const searchParams = useSearchParams();
    return <>{children(searchParams)}</>;
};

const RepositoriesDetails = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>("");

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const tab = searchParams.get("tab");
        if (!tab) {
            router.replace(`${window.location.pathname}?tab=vulnerabilities`);
        } else {
            setActiveTab(tab);
        }
    }, [router]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        const newUrl = `${window.location.pathname}?tab=${tab}`;
        router.push(newUrl);
    };

    const vulnerabilitiesData = [
        {
            name: "CVE-2023-42282",
            discovered: "24-01-2025",
            severity: "Critical",
            dependency: "follow-redirects (npm)",
            exploited: "NO"
        },
        {
            name: "CVE-2023-42282",
            discovered: "24-01-2025",
            severity: "Critical",
            dependency: "lp (npm)",
            exploited: "NO"
        },
        {
            name: "CVE-2023-42282",
            discovered: "24-01-2025",
            severity: "Low",
            dependency: "lp (npm)",
            exploited: "YES"
        },
        {
            name: "CVE-2023-42282",
            discovered: "24-01-2025",
            severity: "High",
            dependency: "mongoose (npm)",
            exploited: "YES"
        },
        {
            name: "CVE-2023-42282",
            discovered: "24-01-2025",
            severity: "Medium",
            dependency: "traverse (npm)",
            exploited: "YES"
        },
        {
            name: "CVE-2023-42282",
            discovered: "24-01-2025",
            severity: "Unknown",
            dependency: "cross-spawn (npm)",
            exploited: "NO"
        }
    ];

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

    const licensesData = [
        {
            name: "Apache-2.0",
            licenseRisk: "Low",
            dependencies: 12,
            licenseFamily: "Permissive"
        },
        {
            name: "MIT",
            licenseRisk: "Medium",
            dependencies: 8,
            licenseFamily: "Permissive"
        },
        {
            name: "GPL-3.0",
            licenseRisk: "High",
            dependencies: 5,
            licenseFamily: "Strong Copyleft"
        },
        {
            name: "BSD-3-Clause",
            licenseRisk: "Low",
            dependencies: 10,
            licenseFamily: "Permissive"
        },
        {
            name: "LGPL-2.1",
            licenseRisk: "Medium",
            dependencies: 7,
            licenseFamily: "Weak Copyleft"
        },
        {
            name: "MPL-2.0",
            licenseRisk: "Unknown",
            dependencies: 4,
            licenseFamily: "Weak Copyleft"
        }
    ];

    return (
        <Suspense fallback={<Loader />}>
            <SearchParamsWrapper>
                {() => (
                    <div>
                        <PageTitle title="Repositories • DepShield.io" />
                        <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                            <span className="md:hidden"><SidebarTrigger /></span>
                            <AvatarMenu />
                        </div>
                        <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                            <GlobalBreadCrumb initialData="Repositories" initalLink="/repositories" secondayData='Details' secondayLink='/repositories/12/details' />
                            <span className="hidden md:flex pr-2">
                                <AvatarMenu />
                            </span>
                        </div>
                        <div className="px-3 lg:px-6">
                            <PageHeadingWithDeleteButton title="6senseEV/6sense-ev-accounting-service" className="hidden md:block pl-2 pt-3" />
                            <PageHeadingHover title="Repository" hoverTitle="6senseEV/6sense-ev-accounting-service" className="block md:hidden pl-2 pt-3" />
                            <div className="tab pt-4">
                                <div className="flex space-x-0 md:space-x-4 border-b">
                                    <button
                                        className={`py-2 px-2 md:px-4 ${activeTab === 'vulnerabilities' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                                        onClick={() => handleTabChange('vulnerabilities')}
                                    >
                                        Vulnerabilities
                                    </button>
                                    <button
                                        className={`py-2 px-4 ${activeTab === 'dependencies' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                                        onClick={() => handleTabChange('dependencies')}
                                    >
                                        Dependencies
                                    </button>
                                    <button
                                        className={`py-2 px-4 ${activeTab === 'licenses' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                                        onClick={() => handleTabChange('licenses')}
                                    >
                                        Licenses
                                    </button>
                                </div>
                            </div>
                            <div className="pt-4">
                                {activeTab === 'vulnerabilities' && (
                                    <>
                                        <VulnabalitiesSearchArea />
                                        <VulnerabilityTable
                                            vulnerabilities={vulnerabilitiesData}
                                            totalCountAndLimit={{ totalCount: vulnerabilitiesData.length, size: 10 }}
                                            currentPage={1}
                                            loading={false}
                                        />
                                    </>
                                )}
                                {activeTab === 'dependencies' && (
                                    <>
                                        <DependenciesSearchArea />
                                        <DependenciesTable
                                            dependencies={dependenciesData}
                                            totalCountAndLimit={{ totalCount: dependenciesData.length, size: 10 }}
                                            currentPage={1}
                                            loading={false}
                                        />
                                    </>
                                )}
                                {activeTab === 'licenses' && (
                                    <>
                                        <LicensesSearchArea />
                                        <LicensesTable
                                            licenses={licensesData}
                                            totalCountAndLimit={{ totalCount: licensesData.length, size: 10 }}
                                            currentPage={1}
                                            loading={false}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </SearchParamsWrapper>
        </Suspense>
    );
};

export default RepositoriesDetails;