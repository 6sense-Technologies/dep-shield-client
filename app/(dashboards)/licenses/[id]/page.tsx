'use client';
import React, { Suspense, useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageHeading from '@/components/pageHeading';
import Loader from '@/components/loader';
import CustomAlert from './_components/customAlert';
import { SingleLicenseTable } from './_components/singleLicenseTable';
import BreadcrumbWithAvatar from '@/components/BreadCrumbiwthAvatar';
import { LicensesData } from '@/constants/DummyDataFactory';

import {
  BadgeCheck,
  Check,
  CircleAlert,
  Info,
  InfoIcon,
  X,
} from 'lucide-react';
import CustomBadge from './_components/CustomBadge';
import Tabs from './_components/Tabs';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getLicenseByRepoId } from '@/helpers/globalLicences/globalLicencesApi';
import { Badge } from '@/components/ui/badge';

const LicensesDetailsContent = () => {
  const session = useSession();
  const params = useParams();
  const licenseId = params.id as string;

  useEffect(() => {
    console.log('Dependency ID:', licenseId);
  }, [licenseId]);

  const { data: licenseByRepoId, isFetching: getLicenseByRepoIdLoading } =
    useQuery<any>({
      queryKey: ['getLicenseById', session],
      queryFn: () => getLicenseByRepoId(session, licenseId),
    });
  console.log(
    '🚀 ~ LicensesDetailsContent ~ licenseByRepoId:',
    licenseByRepoId
  );

  const [activeTab, setActiveTab] = useState<string>('overview');

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
        title={`${licenseByRepoId?.name} Details • Licenses • DepShield.io`}
      />
      <BreadcrumbWithAvatar
        initialData='Licenses'
        initialLink='/licenses'
        secondaryData='Details'
        secondaryLink='/licenses/12'
      />
      <div className='flex items-center pl-4 pt-3 md:pl-8'>
        <PageHeading title={licenseByRepoId?.name} className='mr-4' />
      </div>

      <div className='grid grid-cols-5 items-center px-4 pt-6 md:gap-x-8 md:px-6 md:pt-6'>
        <div className='col-span-1 w-full rounded-lg bg-[#DCFCE7] text-center md:py-6'>
          <p>Low</p>
          <p className='text-sm font-normal text-[#64748B]'>Risk</p>
        </div>
        <div className='col-span-2 w-full'>
          <p>License Family</p>
          <hr />
          <Badge className='mt-4 bg-[#F1F5F9]'>
            <InfoIcon className='ml-2 mr-1 h-4 w-4' />
            <p className='text-xs font-normal'>
              {licenseByRepoId?.useCase?.licenseFamily}
            </p>
          </Badge>
        </div>
        <div className='col-span-2 w-full'>
          <p>License Category</p>
          <hr />
          <Badge className='mt-4 bg-[#F1F5F9]'>
            <InfoIcon className='ml-2 mr-1 h-4 w-4' />
            <p className='text-xs font-normal'>
              {licenseByRepoId?.useCase?.category}
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
              Copyright (C) 2011 Ask Bjørn Hansen
            </p>
            <p className='text-sm font-medium text-deepBlackColor'>
              Copyright (C) 2013 Stripe, Inc. (https://stripe.com)
            </p>
            <p className='pt-4 text-sm font-medium text-deepBlackColor'>
              Permission is hereby granted, free of charge, to any person
              obtaining a copy of this software and associated documentation
              files (the &quot;Software&quot;), to deal in the Software without
              restriction, including without limitation the rights to use, copy,
              modify, merge, publish, distribute, sublicense, and/or sell copies
              of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
            </p>
            <p className='pt-4 text-sm font-medium text-deepBlackColor'>
              The above copyright notice and this permission notice shall be
              included in all copies or substantial portions of the Software.
            </p>
            <p className='pt-4 text-sm font-medium text-deepBlackColor'>
              THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF
              ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
              AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
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
          {licenseByRepoId?.references?.map((ref: string, idx: number) => (
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
            licenses={LicensesData ?? []}
            totalCountAndLimit={{ totalCount: LicensesData.length, size: 10 }}
            currentPage={1}
            loading={false}
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
