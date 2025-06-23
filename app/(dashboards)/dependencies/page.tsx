'use client';
import React, { Suspense, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageHeading from '@/components/pageHeading';
import Loader from '@/components/loader';
import DependenciesSearchArea from './_components/DependenciesSearchArea';
import { AllDependenciesTable } from './_components/AllDependenciesTable';
// import { dependenciesData } from "@/constants/DummyDataFactory";
import BreadcrumbWithAvatar from '@/components/BreadCrumbiwthAvatar';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getAllGlobalDependencies } from '@/helpers/globalDependancies/globalDependenciesApi';

const DependenciesContent = () => {
  const session = useSession();
  const [pages, setPages] = useState<number>(1);
  const [limit] = useState<number>(10);

  const {
    data: allGlobalDependencyData,
    isFetching: allGlobalDependencyDataLoading,
  } = useQuery<any>({
    queryKey: ['AllGlobalDependency', session, pages, limit],
    queryFn: () => getAllGlobalDependencies(session, pages, limit),
  });
  //   console.log(
  //     '🚀 ~ DependenciesContent ~ allGlobalDependencyData:',
  //     allGlobalDependencyData
  //   );

  return (
    <div className='flex min-h-screen flex-col'>
      <PageHeader title='Dependencies • DepShield.io' />
      <BreadcrumbWithAvatar
        initialData='Dependencies'
        initialLink='/dependencies'
      />
      <div className='flex items-center pl-4 pt-3 md:pl-8'>
        <PageHeading title='All Dependencies' className='mr-4' />
      </div>
      <div className='px-4 pt-4 md:px-6 md:pt-4'>
        <DependenciesSearchArea />
        <AllDependenciesTable
          dependencies={allGlobalDependencyData?.data || []}
          totalCountAndLimit={{
            totalCount: allGlobalDependencyData?.count,
            size: 10,
          }}
          currentPage={1}
          loading={false}
        />
      </div>
    </div>
  );
};

const Dependencies = () => {
  return (
    <Suspense fallback={<Loader />}>
      <DependenciesContent />
    </Suspense>
  );
};

export default Dependencies;
