'use client';

import BreadcrumbWithAvatar from '@/components/BreadCrumbiwthAvatar';
import Loader from '@/components/loader';
import PageHeader from '@/components/PageHeader';
import { getRepositoryBranches } from '@/helpers/githubApp/githubApi';
import { RepositoryBranch, RepositoryBranches } from '@/types/repo.types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import TabContent from '../../_components/TabContent';
import TabNavigation from '../../_components/TabNavigation';
import PageHeadingHover from './_components/PageHeadingHover';
import PageHeadingWithDeleteButton from './_components/PageHeadingWithDeleteButton';
import { DropdownOption } from './_components/VulnabalitiesDropdown';

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
  const session = useSession();
  const [activeTab, setActiveTab] = useState<string>('vulnerabilities');
  const [selectedBranch, setSelectedBranch] = useState<string>("");

  const { data: branchesData, isLoading: branchesLoading, error: branchesError } = useQuery<RepositoryBranches>({
    queryKey: ['repository-branches', repoId, session],
    queryFn: () => getRepositoryBranches(repoId as string, session),
    enabled: !!repoId && !!session.data?.accessToken,
  });

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

  // Prepare branch options for dropdown
  const branchOptions: DropdownOption[] = Array.isArray(branchesData?.data)
    ? branchesData.data.map((branch: RepositoryBranch) => ({ value: branch.name, label: branch.name }))
    : [];

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
              secondaryLink={`/repositories/${repoId}/details`}
            />
            <div className='px-3 lg:px-6'>
              <PageHeadingWithDeleteButton
                title='6senseEV/6sense-ev-accounting-service'
                className='hidden pl-2 pt-3 md:block'
                branches={branchOptions}
                selectedBranch={selectedBranch}
                onBranchChange={setSelectedBranch}
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
