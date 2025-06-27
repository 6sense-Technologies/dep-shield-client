'use client';
import BreadcrumbWithAvatar from '@/components/BreadCrumbiwthAvatar';
import Loader from '@/components/loader';
import PageHeader from '@/components/PageHeader';
import PageHeading from '@/components/pageHeading';
import { getSelectedRepo } from '@/helpers/githubApp/githubApi';
import { getDependencyByRepoId } from '@/helpers/globalDependancies/globalDependenciesApi';
import { IDependencyDetails } from '@/types/dependencies.types';
import { TAllRepositories } from '@/types/repo.types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import CustomCard from '../../vulnerabilities/[id]/_components/customCard';
import CustomCardWithBadge from '../../vulnerabilities/[id]/_components/customCardWithBadge';
import DepSearchSection from './_components/DepSearchSection';
import LinkSection from './_components/LinkSection';
import { SingleDepTable } from './_components/SingleDepTable';

const DependenciesDetailsContent = () => {
  const session = useSession();
  const params = useParams();
  const dependencyId = params.id as string;
  const [pages, setPages] = useState(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    const newPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    setPages(newPage);
  }, [searchParams]);

  const { data: dependencyDetails } = useQuery<IDependencyDetails>({
    queryKey: ['dependencyDetails', session],
    queryFn: () => getDependencyByRepoId(session, dependencyId),
  });

  const { data: selectedRepo } = useQuery<TAllRepositories>({
    queryKey: ['selectedRepo', session, pages],
    queryFn: () => getSelectedRepo(dependencyId, session, pages, 10),
  });

  // Helper function to format popularity score
  const formatPopularityScore = (score: number | undefined) => {
    return score !== undefined ? String(Math.round(score * 100)) : '-';
  };

  // Card data configuration
  const cardData = {
    license: {
      heading: dependencyDetails?.license || '-',
      subheading: 'License',
      bgColor: 'bg-[#F1F5F9]',
    },
    package: {
      heading: dependencyDetails?.ecosystem || '-',
      subheading: 'Package',
      bgColor: 'bg-[#F1F5F9]',
    },
    popularity: {
      heading: formatPopularityScore(dependencyDetails?.score?.detail?.popularity),
      subheading: 'Popularity',
      bgColor: 'bg-[#DCFCE7]',
    },
    quality: {
      heading: formatPopularityScore(dependencyDetails?.score?.detail?.quality),
      subheading: 'Quality',
      bgColor: 'bg-[#FDEBDD]',
    },
    maintenance: {
      heading: formatPopularityScore(dependencyDetails?.score?.detail?.maintenance),
      subheading: 'Maintenance',
      bgColor: 'bg-[#FDEBDD]',
    },
  };

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
          title={dependencyDetails?.dependencyName || ''}
          className='mr-4'
        />
      </div>

      {/* Desktop Layout - Large screens and above */}
      <div className='hidden gap-4 px-4 pt-4 md:px-6 md:pt-4 lg:grid lg:grid-cols-4 xl:grid-cols-5'>

        <CustomCardWithBadge
          bgColor={cardData.license.bgColor}
          Heading={cardData.license.heading}
          subheading={cardData.license.subheading}
          icon={true}
        />
        <CustomCardWithBadge
          bgColor={cardData.package.bgColor}
          Heading={cardData.package.heading}
          subheading={cardData.package.subheading}
          icon={true}
        />
        <CustomCard
          bgColor={cardData.popularity.bgColor}
          Heading={cardData.popularity.heading}
          subheading={cardData.popularity.subheading}
        />
        <CustomCard
          bgColor={cardData.quality.bgColor}
          Heading={cardData.quality.heading}
          subheading={cardData.quality.subheading}
        />
        <CustomCard
          bgColor={cardData.maintenance.bgColor}
          Heading={cardData.maintenance.heading}
          subheading={cardData.maintenance.subheading}
        />
      </div>

      {/* Mobile Layout - Hidden on large screens */}
      <div className='grid grid-cols-1 gap-4 px-4 pt-4 md:px-6 md:pt-4 lg:hidden'>
        {/* First row - 2 columns */}
        <div className='grid grid-cols-2 gap-4 lg:hidden'>
          <CustomCardWithBadge
            bgColor={cardData.license.bgColor}
            Heading={cardData.license.heading}
            subheading={cardData.license.subheading}
            icon={true}
          />
          <CustomCardWithBadge
            bgColor={cardData.license.bgColor}
            Heading={cardData.license.heading}
            subheading={cardData.license.subheading}
            icon={true}
          />
        </div>
        {/* Second row - 3 columns */}
        <div className='grid grid-cols-3 gap-4 lg:hidden'>
          <CustomCard
            bgColor={cardData.popularity.bgColor}
            Heading={cardData.popularity.heading}
            subheading={cardData.popularity.subheading}
          />
          <CustomCard
            bgColor={cardData.quality.bgColor}
            Heading={cardData.quality.heading}
            subheading={cardData.quality.subheading}
          />
          <CustomCard
            bgColor={cardData.maintenance.bgColor}
            Heading={cardData.maintenance.heading}
            subheading={cardData.maintenance.subheading}
          />
        </div>
      </div>

      <div className='hidden px-4 pt-6 md:px-6 md:pt-6 lg:flex'>
        <LinkSection version={dependencyDetails?.currentVersion || ''} />
      </div>

      <div className='flex flex-col px-4 pt-6 md:px-6 md:pt-6 lg:hidden'>
        <div className='flex flex-row items-center justify-center gap-x-12 border-b pb-4 lg:hidden'>
          <LinkSection version={dependencyDetails?.currentVersion || ''} />
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
            repos={selectedRepo?.data ?? []}
            totalCountAndLimit={{
              totalCount: selectedRepo?.count ?? 0,
              size: 10,
            }}
            currentPage={pages}
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
