'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';

import { FolderOpen } from 'lucide-react';
import AccessControlSearchArea from './_components/accessControlSearchArea';
import PageHeadingwithButton from '../repositories/_components/PageHeadingwithButton';
import Loader from '@/components/loader';
import { AccessControlTable } from './_components/accessControlTable';
import BreadcrumbWithAvatar from '@/components/BreadCrumbiwthAvatar';

// Need this for next build
const SearchParamsWrapper = ({ children }: { children: ((params: URLSearchParams) => React.ReactNode) | React.ReactNode }) => {
    const searchParams = useSearchParams();
    return <>{typeof children === 'function' ? (children as (params: URLSearchParams) => React.ReactNode)(searchParams) : children}</>;
};

const AccessControl = () => {
    const dummyData = [
        {
            name: "John Doe",
            email: "john.doe@example.com",
            shareTime: "4:30 PM. Feb 13, 2025",
            avatarUrl: "",
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            shareTime: "3:15 PM. Feb 12, 2025",
            avatarUrl: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        },
        {
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            shareTime: "2:00 PM. Feb 11, 2025",
            avatarUrl: "",
        },
    ];

    return (
        <Suspense fallback={<Loader />}>
            <SearchParamsWrapper>
                <div>
                    <PageHeader title="Access Control • DepShield.io" />
                    <BreadcrumbWithAvatar initialData="Access Control" initialLink="/access-control" />
                    <div className="px-3 lg:px-6">
                        <PageHeadingwithButton title="Access Control" className="pl-2 pt-3" showButton={false} />
                        <AccessControlSearchArea empty={dummyData.length === 0} />
                        {dummyData.length === 0 ? (
                            <div className='flex flex-col items-center justify-center h-96 '>
                                <span><FolderOpen size={32} strokeWidth={1} /></span>
                                <p className="text-xl font-medium text-deepBlackColor">No Repositories Shared</p>
                            </div>
                        ) : (
                            <AccessControlTable
                                controls={dummyData ?? []}
                                totalCountAndLimit={{ totalCount: dummyData.length, size: 10 }}
                                currentPage={1}
                                loading={false}
                            />
                        )}
                    </div>
                </div>
            </SearchParamsWrapper>
        </Suspense>
    );
};

export default AccessControl;