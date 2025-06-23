'use client';
import React, { Suspense, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import PageHeading from '@/components/pageHeading';
import Loader from '@/components/loader';
import CustomCard from '../../vulnerabilities/[id]/_components/customCard';
import CustomCardWithBadge from '../../vulnerabilities/[id]/_components/customCardWithBadge';
import { SingleDepTable } from './_components/SingleDepTable';
import DepSearchSection from './_components/DepSearchSection';
import BreadcrumbWithAvatar from '@/components/BreadCrumbiwthAvatar';
import { RepoData } from '@/constants/DummyDataFactory';
import LinkSection from './_components/LinkSection';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getDependencyByRepoId } from '@/helpers/globalDependancies/globalDependenciesApi';

const DependenciesDetailsContent = () => {
  const session = useSession();
  const params = useParams();
  const dependencyId = params.id as string;

  useEffect(() => {
    console.log('Dependency ID:', dependencyId);
  }, [dependencyId]);

  const { data: dependencyByRepoId, isFetching: getDependencyByRepoIdLoading } =
    useQuery<any>({
      queryKey: ['getDependencyById', session],
      queryFn: () => getDependencyByRepoId(session, dependencyId),
    });
  console.log(
    '🚀 ~ DependenciesDetailsContent ~ dependencyByRepoId:',
    dependencyByRepoId
  );

  return (
    <div className='flex min-h-screen flex-col'>
      <PageHeader title='@types/react (npm) Details • Dependencies • DepShield.io' />
      <BreadcrumbWithAvatar
        initialData='Dependencies'
        initialLink='/dependencies'
        secondaryData='Details'
        secondaryLink='/dependencies/12'
      />
      <div className='flex items-center pl-4 pt-3 md:pl-8'>
        <PageHeading
          title={dependencyByRepoId?.dependencyName}
          className='mr-4'
        />
      </div>
      <div className='hidden gap-4 px-4 pt-4 md:px-6 md:pt-4 lg:grid lg:grid-cols-4 xl:grid-cols-5'>
        <CustomCard
          bgColor='bg-[#F1F5F9]'
          Heading={
            dependencyByRepoId?.lastPublishDate
              ? new Date(dependencyByRepoId.lastPublishDate).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )
              : '-'
          }
          subheading='Last Published'
        />
        <CustomCardWithBadge
          bgColor='bg-[#F1F5F9]'
          Heading={dependencyByRepoId?.license || '-'}
          subheading='License'
          icon={true}
        />
        <CustomCard
          bgColor='bg-[#DCFCE7]'
          Heading={
            dependencyByRepoId?.score?.detail?.popularity !== undefined
              ? String(
                  Math.round(dependencyByRepoId.score.detail.popularity * 100)
                )
              : '-'
          }
          subheading='Popularity'
        />
        <CustomCard
          bgColor='bg-[#FDEBDD]'
          Heading='-'
          subheading='Contributors'
        />
        <CustomCard bgColor='bg-[#FDEBDD]' Heading='-' subheading='Security' />
      </div>
      <div className='grid grid-cols-1 gap-4 px-4 pt-4 md:px-6 md:pt-4 lg:hidden'>
        <div className='grid grid-cols-2 gap-4 lg:hidden'>
          <CustomCard
            bgColor='bg-[#F1F5F9]'
            Heading={
              dependencyByRepoId?.lastPublishDate
                ? new Date(
                    dependencyByRepoId.lastPublishDate
                  ).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : '-'
            }
            subheading='Last Published'
          />
          <CustomCardWithBadge
            bgColor='bg-[#F1F5F9]'
            Heading={dependencyByRepoId?.license || '-'}
            subheading='License'
            icon={true}
          />
        </div>
        <div className='grid grid-cols-3 gap-4 lg:hidden'>
          <CustomCard
            bgColor='bg-[#DCFCE7]'
            Heading={
              dependencyByRepoId?.score?.detail?.popularity !== undefined
                ? String(
                    Math.round(dependencyByRepoId.score.detail.popularity * 100)
                  )
                : '-'
            }
            subheading='Popularity'
          />
          <CustomCard
            bgColor='bg-[#FDEBDD]'
            Heading='-'
            subheading='Contributors'
          />
          <CustomCard
            bgColor='bg-[#FDEBDD]'
            Heading='-'
            subheading='Security'
          />
        </div>
      </div>

      <div className='hidden px-4 pt-6 md:px-6 md:pt-6 lg:flex'>
        <LinkSection version={dependencyByRepoId?.currentVersion} />
      </div>

      <div className='flex flex-col px-4 pt-6 md:px-6 md:pt-6 lg:hidden'>
        <div className='flex flex-row items-center justify-center gap-x-12 border-b pb-4 lg:hidden'>
          <LinkSection version={dependencyByRepoId?.currentVersion} />
        </div>
      </div>

      <div className='px-4 pt-6 md:px-6 md:pt-6'>
        <div className='flex items-center gap-2 border-b pb-4'>
          <p className='text-[16px] font-medium text-deepBlackColor'>
            Repositories
          </p>
        </div>
        <div>
          <DepSearchSection />
          <SingleDepTable
            repos={RepoData ?? []}
            totalCountAndLimit={{ totalCount: RepoData.length, size: 10 }}
            currentPage={1}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};

const DependenciesDetails = () => {
  return (
    <Suspense fallback={<Loader />}>
      <DependenciesDetailsContent />
    </Suspense>
  );
};

export default DependenciesDetails;
