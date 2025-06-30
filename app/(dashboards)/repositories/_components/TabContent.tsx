import {
  vulnerabilitiesData
} from '@/constants/DummyDataFactory';
import {
  getAllDependencies,
  getAllLicences as getAllLicenses,
} from '@/helpers/githubApp/githubApi';
import { TAllDependencies } from '@/types/dependencies.types';
import { IAllLicenses } from '@/types/licenses.types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DependenciesSearchArea from '../../dependencies/_components/DependenciesSearchArea';
import { DependenciesTable } from '../[id]/details/_components/DependencyTable';
import LicensesSearchArea from '../[id]/details/_components/LicensesSearchArea';
import { LicensesTable } from '../[id]/details/_components/LicensesTable';
import VulnabalitiesSearchArea from '../[id]/details/_components/vulnabilitiesSearchArea';
import { VulnerabilityTable } from '../[id]/details/_components/VulnabilitiesTable';

interface TabContentProps {
  repoId: string;
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ repoId, activeTab }) => {
  const [pages, setPages] = useState<number>(1);
  const [limit] = useState<number>(10);
  const session = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    setPages(newPage);
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get('page')) {
      setPages(1);
    }
  }, [activeTab, searchParams])

  const { data: allDependencyData } =
    useQuery<TAllDependencies>({
      queryKey: ['AllDependency', session, pages, limit],
      queryFn: () => getAllDependencies(repoId, session, pages, limit),
    });

  const { data: allLicenseData } =
    useQuery<IAllLicenses>({
      queryKey: ['AllLicense', session, pages, limit],
      queryFn: () => getAllLicenses(repoId, session, pages, limit),
    });

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
            currentPage={pages}
            loading={false}
            activeTab={activeTab}
            repoId={repoId}
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
            currentPage={pages}
            loading={false}
            activeTab={activeTab}
            repoId={repoId}
          />
        </>
      )}
      {activeTab === 'licenses' && (
        <>
          <LicensesSearchArea />
          <LicensesTable
            licenses={allLicenseData?.data}
            totalCountAndLimit={{
              totalCount: allLicenseData?.count || 0,
              size: 10,
            }}
            currentPage={pages}
            loading={false}
            activeTab={activeTab}
            repoId={repoId}
          />
        </>
      )}
    </div>
  );
};

export default TabContent;
