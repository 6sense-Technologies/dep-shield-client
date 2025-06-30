'use client';
import BreadcrumbWithAvatar from '@/components/BreadCrumbiwthAvatar';
import Loader from '@/components/loader';
import PageHeader from '@/components/PageHeader';
import PageHeading from '@/components/pageHeading';
import { Badge } from '@/components/ui/badge';
import { getSelectedRepo } from '@/helpers/githubApp/githubApi';
import { getLicenseByRepoId } from '@/helpers/globalLicences/globalLicencesApi';
import { ILicenseDetails } from '@/types/licenses.types';
import { TAllRepositories } from '@/types/repo.types';
import { useQuery } from '@tanstack/react-query';
import {
  InfoIcon
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import CustomAlert from './_components/customAlert';
import CustomBadge from './_components/CustomBadge';
import { SingleLicenseTable } from './_components/singleLicenseTable';
import Tabs from './_components/Tabs';

const LicensesDetailsContent = () => {
  const session = useSession();
  const params = useParams();
  const searchParams = useSearchParams();
  const licenseId = params.id as string;
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [pages, setPages] = useState<number>(1);

  useEffect(() => {
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    setPages(page);
  }, [searchParams]);

  const { data: licenseDetails } = useQuery<ILicenseDetails>({
    queryKey: ['getLicenseById', session],
    queryFn: () => getLicenseByRepoId(session, licenseId),
  });

  const { data: selectedRepositories, isFetching: isFetchingSelectedRepositories } = useQuery<TAllRepositories>({
    queryKey: ['selectedRepositories', session, pages, licenseDetails?.licenseId],
    queryFn: () => getSelectedRepo(session, pages, 10, undefined, licenseDetails?.licenseId),
    enabled: !!licenseDetails?.licenseId,
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'fulltext', label: 'Full text' },
  ];

  return (
    <div className='flex min-h-screen flex-col'>
      <PageHeader
        title={`${licenseDetails?.name} Details • Licenses • DepShield.io`}
      />
      <BreadcrumbWithAvatar
        initialData='Licenses'
        initialLink='/licenses'
        secondaryData='Details'
        secondaryLink='/licenses/12'
      />
      <div className='flex items-center pl-4 pt-3 md:pl-8'>
        <PageHeading title={licenseDetails?.name || ""} className='mr-4' />
      </div>

      <div className='grid grid-cols-5 items-center px-4 pt-6 md:gap-x-8 md:px-6 md:pt-6'>
        <div className='col-span-1 w-full rounded-lg bg-[#DCFCE7] text-center md:py-6'>
          <p>{licenseDetails?.useCase?.licenseRisk}</p>
          <p className='text-sm font-normal text-[#64748B]'>Risk</p>
        </div>
        <div className='col-span-2 w-full'>
          <p>License Family</p>
          <hr />
          <Badge className='mt-4 bg-[#F1F5F9]'>
            <InfoIcon className='ml-2 mr-1 h-4 w-4' />
            <p className='text-xs font-normal'>
              {licenseDetails?.useCase?.licenseFamily}
            </p>
          </Badge>
        </div>
        <div className='col-span-2 w-full'>
          <p>License Category</p>
          <hr />
          <Badge className='mt-4 bg-[#F1F5F9]'>
            <InfoIcon className='ml-2 mr-1 h-4 w-4' />
            <p className='text-xs font-normal'>
              {licenseDetails?.useCase?.category}
            </p>
          </Badge>
        </div>
      </div>

      <CustomAlert />

      <div className='px-4 pt-6 md:px-6 md:pt-6'>
        <Tabs activeTab={activeTab} onTabChange={handleTabChange} tabs={tabs} />
      </div>
      <div className='px-4 pt-6 md:px-6 md:pt-6'>
        {activeTab === 'overview' && (
          <div>
            <p className='text-sm font-medium text-deepBlackColor'>
              A short and simple permissive license with conditions only
              requiring preservation of copyright and license notices. Licensed
              works, modifications, and larger works may be distributed under
              different terms and without source code.
            </p>
          </div>
        )}
        {activeTab === 'fulltext' && (
          <div className='pr-20 md:pr-10 lg:pr-[510px]'>
            <p className='text-sm font-medium text-deepBlackColor'>
              {licenseDetails?.licenseText}
            </p>
            <p className='pt-4 text-sm font-medium text-deepBlackColor'>
              {licenseDetails?.reference}
            </p>
          </div>
        )}
      </div>

      <div className='px-4 pt-6 md:px-6 md:pt-6'>
        <div className='flex items-center gap-2 border-b pb-4'>
          <p className='text-[16px] font-medium text-deepBlackColor'>
            References
          </p>
        </div>
        <div className='mt-3 flex flex-wrap gap-3'>
          {licenseDetails?.references?.map((ref: string, idx: number) => (
            <CustomBadge key={idx} label={ref} />
          ))}
        </div>
      </div>

      <div className='px-4 pt-6 md:px-6 md:pt-6'>
        <div className='flex items-center gap-2 border-b pb-4'>
          <p className='text-[16px] font-medium text-deepBlackColor'>
            Affected Repositories
          </p>
        </div>
        <div>
          <SingleLicenseTable
            licenses={selectedRepositories?.data ?? []}
            totalCountAndLimit={{ totalCount: selectedRepositories?.count ?? 0, size: 10 }}
            currentPage={pages}
            loading={isFetchingSelectedRepositories}
            licenseDetails={licenseDetails}
          />
        </div>
      </div>
    </div>
  );
};

const LicensesDetails = () => {
  return (
    <Suspense fallback={<Loader />}>
      <LicensesDetailsContent />
    </Suspense>
  );
};

export default LicensesDetails;
