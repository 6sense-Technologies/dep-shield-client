'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import PageHeadingWithDeleteButton from './_components/PageHeadingWithDeleteButton';
import PageHeadingHover from './_components/PageHeadingHover';
import Loader from '@/components/loader';
import TabNavigation from '../../_components/TabNavigation';
import TabContent from '../../_components/TabContent';
import BreadcrumbWithAvatar from '@/components/BreadCrumbiwthAvatar';
import { useParams } from 'next/navigation';

const SearchParamsWrapper = ({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  return <>{children(searchParams)}</>;
};

const RepositoriesDetails = () => {
  const repoId = useParams().id;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('vulnerabilities');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    // console.log('🚀 ~ useEffect ~ searchParams:', searchParams);
    const tab = searchParams.get('tab');
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
            <PageHeader title='Repositories • DepShield.io' />
            <BreadcrumbWithAvatar
              initialData='Repositories'
              initialLink='/repositories'
              secondaryData='Details'
              secondaryLink='/repositories/12/details'
            />
            <div className='px-3 lg:px-6'>
              <PageHeadingWithDeleteButton
                title='6senseEV/6sense-ev-accounting-service'
                className='hidden pl-2 pt-3 md:block'
              />
              <PageHeadingHover
                title='Repository'
                hoverTitle='6senseEV/6sense-ev-accounting-service'
                className='block pl-2 pt-3 md:hidden'
              />
              <TabNavigation
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
              <TabContent repoId={repoId as string} activeTab={activeTab} />
            </div>
          </div>
        )}
      </SearchParamsWrapper>
    </Suspense>
  );
};

export default RepositoriesDetails;
