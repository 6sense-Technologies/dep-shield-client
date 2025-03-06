'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AvatarMenu from '@/components/AvatarMenu';
import GlobalBreadCrumb from '@/components/globalBreadCrumb';
import PageTitle from '@/components/PageTitle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import PageHeadingWithDeleteButton from './_components/PageHeadingWithDeleteButton';
import VulnabalitiesSearchArea from './_components/vulnabilitiesSearchArea';
import Loader from '@/components/loader';
import { VulnerabilityTable } from './_components/VulnabilitiesTable';
import PageHeadingHover from './_components/PageHeadingHover';
import DependenciesSearchArea from './_components/DependenciesSearchArea';
import { DependenciesTable } from './_components/DependencyTable';
import LicensesSearchArea from './_components/LicensesSearchArea';
import { LicensesTable } from './_components/LicensesTable';
import { dependenciesData, licensesData, vulnerabilitiesData } from '@/constants/DummyDataFactory';

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