'use client';
import BreadcrumbWithAvatar from '@/components/BreadCrumbiwthAvatar';
import PageHeader from '@/components/PageHeader';
import EmptyTableSkeleton from '@/components/emptyTableSkeleton';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { shareData } from '@/constants/DummyDataFactory';
import { getAllRepositories } from '@/helpers/githubApp/githubApi';
import { useQuery } from '@tanstack/react-query';
import { FolderOpen, Plus, Share } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import MyRepoSearchArea from './_components/MyRepoSearchArea';
import PageHeadingwithButton from './_components/PageHeadingwithButton';
import RepoSearchArea from './_components/RepoSearchArea';
import { MyRepoTable } from './_components/myRepoTable';
import { RepoTable } from './_components/repotable';
import { ShareTable } from './_components/shareTable';

// Need this for next build
const SearchParamsWrapper = ({
  children,
}: {
  children: ((params: URLSearchParams) => React.ReactNode) | React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  return (
    <>
      {typeof children === 'function'
        ? (children as (params: URLSearchParams) => React.ReactNode)(
          searchParams
        )
        : children}
    </>
  );
};

const Repositories = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('myrepositories');
  const searchParams = useSearchParams();
  const [pages, setPages] = useState<number>(1);
  const [limit] = useState<number>(10);
  const session = useSession();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (!tab) {
      router.replace(`${window.location.pathname}?tab=myrepositories`);
    } else {
      setActiveTab(tab);
    }
  }, [searchParams, router]);

  useEffect(() => {
    const newPage = searchParams.get('page')
      ? Number(searchParams.get('page'))
      : 1;

    setPages(newPage);
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const newUrl = `${window.location.pathname}?tab=${tab}`;
    router.push(newUrl);
  };

  const { data: AllRepoData, isFetching: RepoDataLoading } = useQuery<any>({
    queryKey: ['AllRepo', session, pages, limit],
    queryFn: () => getAllRepositories(session, pages, limit),
  });
  // console.log('🚀 ~ Repositories ~ RepoData:', AllRepoData?.data);

  return (
    <Suspense fallback={<Loader />}>
      <SearchParamsWrapper>
        {() => (
          <div>
            <PageHeader title='Repositories • DepShield.io' />
            <BreadcrumbWithAvatar
              initialData='Repositories'
              initialLink='/repositories'
            />
            <div className='px-3 lg:px-6'>
              <PageHeadingwithButton
                title='All Repositories'
                className='pl-2 pt-3'
                showButton={activeTab !== 'all'}
                session={session}
              />
              <div className='tab pt-4'>
                <div className='flex space-x-2 border-b md:space-x-4'>
                  <button
                    className={`px-4 py-2 ${activeTab === 'all' ? 'border-b-2 border-black font-semibold text-black' : 'cursor-not-allowed font-semibold text-gray-300'}`}
                    onClick={() => handleTabChange('all')}
                    disabled
                  >
                    All
                  </button>
                  <button
                    className={`text-nowrap px-4 py-2 ${activeTab === 'myrepositories' ? 'border-b-2 border-black font-semibold text-black' : 'cursor-not-allowed font-semibold text-gray-300'}`}
                    onClick={() => handleTabChange('myrepositories')}
                  >
                    My repositories
                  </button>
                  <button
                    className={`text-nowrap px-4 py-2 ${activeTab === 'sharedwithme' ? 'border-b-2 border-black font-semibold text-black' : 'cursor-not-allowed font-semibold text-gray-300'}`}
                    onClick={() => handleTabChange('sharedwithme')}
                    disabled
                  >
                    Shared with me
                  </button>
                </div>
              </div>
              <div className=''>
                {activeTab === 'all' && (
                  <>
                    <RepoSearchArea />
                    {RepoDataLoading ? (
                      <EmptyTableSkeleton />
                    ) : (
                      <>
                        {AllRepoData?.totalCount === 0 ? (
                          <div className='flex h-96 flex-col items-center justify-center'>
                            <span>
                              <FolderOpen size={32} strokeWidth={1} />
                            </span>
                            <p className='text-xl font-medium text-deepBlackColor'>
                              No Repositories Added
                            </p>
                            <p className='pb-7 pt-1 text-sm font-normal text-inputFooterColor'>
                              Get started by adding a new repository.
                            </p>
                            <Link href='/repositories/add'>
                              <Button className='w-20'>
                                Add{' '}
                                <span className='text-white'>
                                  <Plus size={16} />
                                </span>
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <RepoTable
                            repos={AllRepoData?.data}
                            totalCountAndLimit={{
                              totalCount: AllRepoData?.count,
                              size: 10,
                            }}
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
                    {RepoDataLoading ? (
                      <EmptyTableSkeleton />
                    ) : (
                      <>
                        {AllRepoData?.totalCount === 0 ? (
                          <div className='flex h-96 flex-col items-center justify-center'>
                            <span>
                              <FolderOpen size={32} strokeWidth={1} />
                            </span>
                            <p className='text-xl font-medium text-deepBlackColor'>
                              No Shared Repositories
                            </p>
                            <p className='pb-7 pt-1 text-sm font-normal text-inputFooterColor'>
                              You haven&#39;t shared any repositories yet.
                            </p>
                            <Button className='w-[84px]'>
                              Share{' '}
                              <span className='text-white'>
                                <Share size={16} />
                              </span>
                            </Button>
                          </div>
                        ) : (
                          <MyRepoTable
                            repos={AllRepoData?.data}
                            totalCountAndLimit={{
                              totalCount: AllRepoData?.count,
                              size: 10,
                            }}
                            currentPage={pages}
                            loading={false}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
                {activeTab === 'sharedwithme' && (
                  <>
                    <RepoSearchArea />
                    {shareData.length === 0 ? (
                      <div className='flex h-96 flex-col items-center justify-center'>
                        <span>
                          <FolderOpen size={32} strokeWidth={1} />
                        </span>
                        <p className='text-xl font-medium text-deepBlackColor'>
                          No Repositories Shared With You
                        </p>
                        <p className='pb-7 pt-1 text-sm font-normal text-inputFooterColor'>
                          No one has shared a repository with you yet.
                        </p>
                      </div>
                    ) : (
                      <ShareTable
                        data={shareData}
                        totalCountAndLimit={{
                          totalCount: shareData.length,
                          size: 10,
                        }}
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
