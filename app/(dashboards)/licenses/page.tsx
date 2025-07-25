'use client';
import BreadcrumbWithAvatar from '@/components/BreadCrumbiwthAvatar';
import Loader from '@/components/loader';
import PageHeader from '@/components/PageHeader';
import PageHeading from '@/components/pageHeading';
import { getAllGlobalLicense } from '@/helpers/globalLicences/globalLicencesApi';
import { IAllLicenses } from '@/types/licenses.types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import AllLicensesSearchArea from './_components/AllLicensesSearchArea';
import { AllLicensesTable } from './_components/AllLicensesTable';

const LicensesContent = () => {
  const session = useSession();
  const [pages, setPages] = useState<number>(1);
  const [limit] = useState<number>(10);
  const searchParams = useSearchParams();

  useEffect(() => {
    const newPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    setPages(newPage);
  }, [searchParams]);

  const { data: allGlobalLicenseData } = useQuery<IAllLicenses>({
    queryKey: ['AllGlobalLicense', session, pages, limit],
    queryFn: () => getAllGlobalLicense(session, pages, limit),
  });

  return (
    <div className='flex min-h-screen flex-col'>
      <PageHeader title='Licenses • DepShield.io' />
      <BreadcrumbWithAvatar initialData='Licenses' initialLink='/licenses' />
      <div className='flex items-center pl-4 pt-3 md:pl-8'>
        <PageHeading title='All Licenses' className='mr-4' />
      </div>
      <div className='px-4 pt-4 md:px-6 md:pt-4'>
        <AllLicensesSearchArea />
        <AllLicensesTable
          licenses={allGlobalLicenseData?.data || []}
          totalCountAndLimit={{
            totalCount: allGlobalLicenseData?.count || 0,
            size: 10,
          }}
          currentPage={pages}
          loading={false}
        />
      </div>
    </div>
  );
};

const Licenses = () => {
  return (
    <Suspense fallback={<Loader />}>
      <LicensesContent />
    </Suspense>
  );
};

export default Licenses;
