'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AvatarMenu from '@/components/AvatarMenu';
import GlobalBreadCrumb from '@/components/globalBreadCrumb';
import PageTitle from '@/components/PageTitle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import PageHeadingWithDeleteButton from './_components/PageHeadingWithDeleteButton';
import PageHeadingHover from './_components/PageHeadingHover';
import Loader from '@/components/loader';
import TabNavigation from '../../_components/TabNavigation';
import TabContent from '../../_components/TabContent';


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
                            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
                            <TabContent activeTab={activeTab} />
                        </div>
                    </div>
                )}
            </SearchParamsWrapper>
        </Suspense>
    );
};

export default RepositoriesDetails;