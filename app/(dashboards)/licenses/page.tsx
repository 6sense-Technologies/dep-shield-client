'use client';
import React, { Suspense, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageHeading from '@/components/pageHeading';
import Loader from '@/components/loader';
import AllLicensesSearchArea from './_components/AllLicensesSearchArea';
import { AllLicensesTable } from './_components/AllLicensesTable';
import BreadcrumbWithAvatar from '@/components/BreadCrumbiwthAvatar';
// import { EffectedlicensesData } from '@/constants/DummyDataFactory';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getAllGlobalLicense } from '@/helpers/globalLicences/globalLicencesApi';

const LicensesContent = () => {
  const session = useSession();
  const [pages, setPages] = useState<number>(1);
  const [limit] = useState<number>(10);

  const {
    data: allGlobalLicenseData,
    isFetching: allGlobalLicenseDataLoading,
  } = useQuery<any>({
    queryKey: ['AllGlobalLicense', session, pages, limit],
    queryFn: () => getAllGlobalLicense(session, pages, limit),
  });
  console.log(
    '🚀 ~ LicensesContent ~ allGlobalLicenseData:',
    allGlobalLicenseData
  );

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
            totalCount: allGlobalLicenseData?.count,
            size: 10,
          }}
          currentPage={1}
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
