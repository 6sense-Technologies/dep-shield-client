import React, { useState } from 'react';

import {
  dependenciesData,
  licensesData,
  vulnerabilitiesData,
} from '@/constants/DummyDataFactory';
import VulnabalitiesSearchArea from '../[id]/details/_components/vulnabilitiesSearchArea';
import { VulnerabilityTable } from '../[id]/details/_components/VulnabilitiesTable';
import DependenciesSearchArea from '../../dependencies/_components/DependenciesSearchArea';
import { DependenciesTable } from '../[id]/details/_components/DependencyTable';
import LicensesSearchArea from '../[id]/details/_components/LicensesSearchArea';
import { LicensesTable } from '../[id]/details/_components/LicensesTable';
import { useQuery } from '@tanstack/react-query';
import {
  getAllDependencies,
  getAllLicences,
} from '@/helpers/githubApp/githubApi';
import { useSession } from 'next-auth/react';
import { all } from 'axios';
import { TDependency } from '@/types/dependencies.types';

interface TabContentProps {
  repoId: string;
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ repoId, activeTab }) => {
  // console.log('🚀 ~ repoId:', repoId);
  const [pages, setPages] = useState<number>(1);
  const [limit] = useState<number>(10);
  const session = useSession();
  const demoRepoId = '67c7ae1543029bcbed4be382';

  const { data: allDependencyData, isFetching: allDependencyDataLoading } =
    useQuery<any>({
      queryKey: ['AllDependency', session, pages, limit],
      queryFn: () => getAllDependencies(repoId, session, pages, limit),
    });
  console.log('🚀 ~ allDependencyData:', allDependencyData);

  const { data: allLicenseData, isFetching: allLicenseDataLoading } =
    useQuery<any>({
      queryKey: ['AllLicense', session, pages, limit],
      queryFn: () => getAllLicences(repoId, session, pages, limit),
    });
  // console.log('🚀 ~ allLicenseData:', allLicenseData);

  return (
    <div className='pt-4'>
      {activeTab === 'vulnerabilities' && (
        <>
          <VulnabalitiesSearchArea />
          <VulnerabilityTable
            vulnerabilities={vulnerabilitiesData}
            totalCountAndLimit={{
              totalCount: vulnerabilitiesData.length,
              size: 10,
            }}
            currentPage={1}
            loading={false}
          />
        </>
      )}
      {activeTab === 'dependencies' && (
        <>
          <DependenciesSearchArea />
          <DependenciesTable
            dependencies={allDependencyData?.data}
            totalCountAndLimit={{
              totalCount: allDependencyData?.count ?? 0,
              size: 10,
            }}
            currentPage={1}
            loading={false}
          />
        </>
      )}
      {activeTab === 'licenses' && (
        <>
          <LicensesSearchArea />
          <LicensesTable
            licenses={allLicenseData?.data}
            totalCountAndLimit={{
              totalCount: allLicenseData?.totalCount,
              size: 10,
            }}
            currentPage={1}
            loading={false}
          />
        </>
      )}
    </div>
  );
};

export default TabContent;
