'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import { FolderOpen, Plus, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RepoTable } from './_components/repotable';
import RepoSearchArea from './_components/RepoSearchArea';
import MyRepoSearchArea from './_components/MyRepoSearchArea';
import PageHeadingwithButton from './_components/PageHeadingwithButton';
import { MyRepoTable } from './_components/myRepoTable';
import { ShareTable } from './_components/shareTable';
import Loader from '@/components/loader';
import { useQuery } from '@tanstack/react-query';
import { getAllRepositories } from '@/helpers/githubApp/githubApi';
import { useSession } from 'next-auth/react';
import EmptyTableSkeleton from '@/components/emptyTableSkeleton';
import Link from 'next/link';
import { additionalDummyData, shareData } from '@/constants/DummyDataFactory';
import BreadcrumbWithAvatar from '@/components/BreadCrumbiwthAvatar';

// Need this for next build
const SearchParamsWrapper = ({ children }: { children: ((params: URLSearchParams) => React.ReactNode) | React.ReactNode }) => {
  const searchParams = useSearchParams();
  return <>{typeof children === 'function' ? (children as (params: URLSearchParams) => React.ReactNode)(searchParams) : children}</>;
};

const Repositories = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("");
  const searchParams = useSearchParams();
  const [pages, setPages] = useState<number>(1);
  const [limit] = useState<number>(10);
  const session = useSession();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (!tab) {
      router.replace(`${window.location.pathname}?tab=all`);
    } else {
      setActiveTab(tab);
    }
  }, [searchParams, router]);

  useEffect(() => {
    const newPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    setPages(newPage);
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const newUrl = `${window.location.pathname}?tab=${tab}`;
    router.push(newUrl);
  };

  const {
    data: AllRepoData,
    isFetching: RepoDataLoading,
  } = useQuery<any>({
    queryKey: ["AllRepo", session, pages, limit],
    queryFn: () => getAllRepositories(session, pages, limit),
  });
  console.log("🚀 ~ Repositories ~ RepoData:", AllRepoData);

  return (
    <Suspense fallback={<Loader />}>
      <SearchParamsWrapper>
        {() => (
          <div>
            <PageHeader title="Repositories • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Repositories" initialLink="/repositories" />
            <div className="px-3 lg:px-6">
              <PageHeadingwithButton title="All Repositories" className="pl-2 pt-3" showButton={activeTab !== 'all'} />
              <div className="tab pt-4">
                <div className="flex space-x-2 md:space-x-4 border-b">
                  <button
                    className={`py-2 px-4 ${activeTab === 'all' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                    onClick={() => handleTabChange('all')}
                  >
                    All
                  </button>
                  <button
                    className={`py-2 px-4 text-nowrap ${activeTab === 'myrepositories' ? 'border-b-2 border-black font-semibold text-black' : 'text-gray-300 font-semibold cursor-not-allowed'}`}
                    onClick={() => handleTabChange('myrepositories')}
                    disabled
                  >
                    My repositories
                  </button>
                  <button
                    className={`py-2 px-4 text-nowrap ${activeTab === 'sharedwithme' ? 'border-b-2 border-black font-semibold text-black' : 'text-gray-300 font-semibold cursor-not-allowed'}`}
                    onClick={() => handleTabChange('sharedwithme')}
                    disabled
                  >
                    Shared with me
                  </button>
                </div>
              </div>
              <div className="">
                {activeTab === 'all' && (
                  <>
                    <RepoSearchArea />
                    {RepoDataLoading ? (
                      <EmptyTableSkeleton />
                    ) : (
                      <>
                        {AllRepoData?.totalCount === 0 ? (
                          <div className='flex flex-col items-center justify-center h-96 '>
                            <span><FolderOpen size={32} strokeWidth={1} /></span>
                            <p className="text-xl font-medium text-deepBlackColor">No Repositories Added</p>
                            <p className='text-sm font-normal text-inputFooterColor pt-1 pb-7'>Get started by adding a new repository.</p>
                            <Link href="/repositories/add"><Button className='w-20'>Add <span className='text-white'><Plus size={16} /></span></Button></Link> 
                          </div>
                        ) : (
                          <RepoTable
                            repos={AllRepoData?.repositories}
                            totalCountAndLimit={{ totalCount: AllRepoData?.totalCount, size: 10 }}
                            currentPage={1}
                            loading={false}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
                {activeTab === 'myrepositories' && (
                  <>
                    <MyRepoSearchArea />
                    {additionalDummyData.length === 0 ? (
                      <div className='flex flex-col items-center justify-center h-96 '>
                        <span><FolderOpen size={32} strokeWidth={1} /></span>
                        <p className="text-xl font-medium text-deepBlackColor">No Shared Repositories</p>
                        <p className='text-sm font-normal text-inputFooterColor pt-1 pb-7'>You haven&#39;t shared any repositories yet.</p>
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
        )}
      </SearchParamsWrapper>
    </Suspense>
  );
};

export default Repositories;