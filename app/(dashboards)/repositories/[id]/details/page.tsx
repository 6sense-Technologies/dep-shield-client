'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AvatarMenu from '@/components/AvatarMenu';
import GlobalBreadCrumb from '@/components/globalBreadCrumb';
import PageTitle from '@/components/PageTitle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import PageHeadingWithDeleteButton from './_components/PageHeadingWithDeleteButton';
import VulnabalitiesSearchArea from './_components/vulnabilitiesSearchArea';

const RepositoriesDetails = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [activeTab, setActiveTab] = useState<string>(
        searchParams.get("tab") || "vulnerabilities"
    );

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        const newUrl = `${window.location.pathname}?tab=${tab}`;
        router.push(newUrl);
    };

    return (
        <div>
            <PageTitle
                title="Repositories • DepShield.io"
            />
            <div className="flex justify-between items-center md:hidden px-4 py-2">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
            </div>
            <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                <GlobalBreadCrumb
                    initialData="Repositories"
                    initalLink="/repositories"
                />
                <span className="hidden md:flex pr-2">
                    <AvatarMenu />
                </span>
            </div>
            <div className="px-3 lg:px-6">
                <PageHeadingWithDeleteButton title="6senseEV/6sense-ev-accounting-service" className="pl-2 pt-3" />
                <div className="tab pt-4">
                    <div className="flex space-x-4 border-b">
                        <button
                            className={`py-2 px-4 ${activeTab === 'vulnerabilities' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                            onClick={() => handleTabChange('vulnerabilities')}
                        >
                            Vulnerabilities
                        </button>
                        <button
                            className={`py-2 px-4 ${activeTab === 'dependency' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                            onClick={() => handleTabChange('dependency')}
                        >
                            Dependency
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
                        <VulnabalitiesSearchArea />
                    )}
                    {activeTab === 'dependency' && (
                        <div>Dummy text for Dependency</div>
                    )}
                    {activeTab === 'licenses' && (
                        <div>Dummy text for Licenses</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RepositoriesDetails;