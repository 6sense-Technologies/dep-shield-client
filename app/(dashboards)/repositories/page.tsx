'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AvatarMenu from '@/components/AvatarMenu';
import GlobalBreadCrumb from '@/components/globalBreadCrumb';
import PageTitle from '@/components/PageTitle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { FolderOpen, Plus, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RepoTable } from './_components/repotable';
import RepoSearchArea from './_components/RepoSearchArea';
import MyRepoSearchArea from './_components/MyRepoSearchArea';
import PageHeadingwithButton from './_components/PageHeadingwithButton';
import { MyRepoTable } from './_components/myRepoTable';
import { ShareTable } from './_components/shareTable';
import Loader from '@/components/loader';

const SearchParamsWrapper = ({ children }: { children: ((params: URLSearchParams) => React.ReactNode) | React.ReactNode }) => {
  const searchParams = useSearchParams();
  return <>{typeof children === 'function' ? (children as (params: URLSearchParams) => React.ReactNode)(searchParams) : children}</>;
};

const Repositories = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>("");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const newUrl = `${window.location.pathname}?tab=${tab}`;
    router.push(newUrl);
  };

  const dummyData = [
    {
      repositoryName: "6senseEV/6sense-ev-accounting-service",
      totalVulnerabilities: 13,
      vulnerabilities: [
        { id: 1, name: "Critical", severity: "Critical" },
        { id: 2, name: "High", severity: "High" },
      ],
      sharingDetails: [
        { id: 1, name: "User 1", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
      ],
    },
    {
      repositoryName: "6senseEV/6sense-ev-billing-service",
      totalVulnerabilities: 3,
      vulnerabilities: [
        { id: 1, name: "Low", severity: "Low" },
        { id: 2, name: "Medium", severity: "Medium" },
      ],
      sharingDetails: [
        { id: 1, name: "User 4", avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg" },
        { id: 2, name: "User 5", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
      ],
    },
    {
      repositoryName: "6senseEV/6sense-ev-customer-service",
      totalVulnerabilities: 2,
      vulnerabilities: [
        { id: 1, name: "Critical", severity: "Critical" },
        { id: 2, name: "High", severity: "High" },
      ],
      sharingDetails: [
        { id: 1, name: "User 6", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: 2, name: "User 7", avatarUrl: "url7" },
        { id: 3, name: "User 8", avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg" },
      ],
    },
  ];

  const additionalDummyData = [
    {
      repositoryName: "6senseEV/6sense-ev-accounting-service",
      totalVulnerabilities: 13,
      vulnerabilities: [
        { id: 1, name: "Critical", severity: "Critical" },
        { id: 2, name: "High", severity: "High" },
      ],
      sharingDetails: [
        { id: 1, name: "User 1", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
      ],
    },
    {
      repositoryName: "6senseEV/6sense-ev-billing-service",
      totalVulnerabilities: 3,
      vulnerabilities: [
        { id: 1, name: "Low", severity: "Low" },
        { id: 2, name: "Medium", severity: "Medium" },
      ],
      sharingDetails: [
        { id: 1, name: "User 4", avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg" },
        { id: 2, name: "User 5", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
      ],
    },
    {
      repositoryName: "6senseEV/6sense-ev-customer-service",
      totalVulnerabilities: 2,
      vulnerabilities: [
        { id: 1, name: "Critical", severity: "Critical" },
        { id: 2, name: "High", severity: "High" },
      ],
      sharingDetails: [
        { id: 1, name: "User 6", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: 2, name: "User 7", avatarUrl: "url7" },
        { id: 3, name: "User 8", avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg" },
      ],
    },
  ];

  const shareData = [
    {
      sharedBy: {
        name: "User 1",
        avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      sharedRepositories: 12,
      platform: "GitHub",
    },
    {
      sharedBy: {
        name: "User 2",
        avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      sharedRepositories: 13,
      platform: "GitLab",
    },
    {
      sharedBy: {
        name: "User 3",
        avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      sharedRepositories: 10,
      platform: "BitBucket",
    },
    {
      sharedBy: {
        name: "User 4",
        avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      sharedRepositories: 15,
      platform: "GitHub",
    },
    {
      sharedBy: {
        name: "User 5",
        avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      },
      sharedRepositories: 8,
      platform: "GitLab",
    },
    {
      sharedBy: {
        name: "User 6",
        avatarUrl: "https://randomuser.me/api/portraits/women/6.jpg",
      },
      sharedRepositories: 20,
      platform: "BitBucket",
    },
  ];

  return (
    <Suspense fallback={<Loader />}>
      <SearchParamsWrapper>
        {(searchParams) => {
          useEffect(() => {
            const tab = searchParams.get("tab");
            if (!tab) {
              router.replace(`${window.location.pathname}?tab=all`);
            }
            else {
              setActiveTab(tab);
            }
          }, [searchParams]);

          return (
            <div>
              <PageTitle title="Repositories • DepShield.io" />
              <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
              </div>
              <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                <GlobalBreadCrumb initialData="Repositories" initalLink="/repositories" />
                <span className="hidden md:flex pr-2">
                  <AvatarMenu />
                </span>
              </div>
              <div className="px-3 lg:px-6">
                <PageHeadingwithButton title="All Repositories" className="pl-2 pt-3" showButton={activeTab !== 'all'} />
                <div className="tab pt-4">
                  <div className="flex space-x-4 border-b">
                    <button
                      className={`py-2 px-4 ${activeTab === 'all' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                      onClick={() => handleTabChange('all')}
                    >
                      All
                    </button>
                    <button
                      className={`py-2 px-4 ${activeTab === 'myrepositories' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                      onClick={() => handleTabChange('myrepositories')}
                    >
                      My repositories
                    </button>
                    <button
                      className={`py-2 px-4 ${activeTab === 'sharedwithme' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                      onClick={() => handleTabChange('sharedwithme')}
                    >
                      Shared with me
                    </button>
                  </div>
                </div>
                <div className="">
                  {activeTab === 'all' && (
                    <>
                      <RepoSearchArea
                        all={true}
                      />
                      {dummyData.length === 0 ? (
                        <div className='flex flex-col items-center justify-center h-96 '>
                          <span><FolderOpen size={32} strokeWidth={1} /></span>
                          <p className="text-xl font-medium text-deepBlackColor">No Repositories Added</p>
                          <p className='text-sm font-normal text-inputFooterColor pt-1 pb-7'>Get started by adding a new repository.</p>
                          <Button className='w-20'>Add <span className='text-white'><Plus size={16} /></span></Button>
                        </div>
                      ) : (
                        <RepoTable
                          repos={dummyData}
                          totalCountAndLimit={{ totalCount: dummyData.length, size: 10 }}
                          currentPage={1}
                          loading={false}
                        />
                      )}
                    </>
                  )}
                  {activeTab === 'myrepositories' && (
                    <>
                      <MyRepoSearchArea />
                      {dummyData.length === 0 ? (
                        <div className='flex flex-col items-center justify-center h-96 '>
                          <span><FolderOpen size={32} strokeWidth={1} /></span>
                          <p className="text-xl font-medium text-deepBlackColor">No Shared Repositories</p>
                          <p className='text-sm font-normal text-inputFooterColor pt-1 pb-7'>You haven't shared any repositories yet.</p>
                          <Button className='w-[84px]'>Share <span className='text-white'><Share size={16} /></span></Button>
                        </div>
                      ) : (
                        <MyRepoTable
                          repos={additionalDummyData}
                          totalCountAndLimit={{ totalCount: additionalDummyData.length, size: 10 }}
                          currentPage={1}
                          loading={false}
                        />
                      )}
                    </>
                  )}
                  {activeTab === 'sharedwithme' && (
                    <>
                      <RepoSearchArea />
                      {shareData.length === 0 ? (
                        <div className='flex flex-col items-center justify-center h-96 '>
                          <span><FolderOpen size={32} strokeWidth={1} /></span>
                          <p className="text-xl font-medium text-deepBlackColor">No Repositories Shared With You</p>
                          <p className='text-sm font-normal text-inputFooterColor pt-1 pb-7'>No one has shared a repository with you yet.</p>
                        </div>
                      ) : (
                        <ShareTable
                          data={shareData}
                          totalCountAndLimit={{ totalCount: shareData.length, size: 10 }}
                          currentPage={1}
                          loading={false}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </SearchParamsWrapper>
    </Suspense>
  );
};

export default Repositories;