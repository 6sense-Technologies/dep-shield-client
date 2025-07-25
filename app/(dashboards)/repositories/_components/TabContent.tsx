import VulnerabilityTable from "@/app/(dashboards)/vulnerabilities/_components/VulnerabilityTable";
import { getAllVulnerabilitiesByRepo } from "@/app/(dashboards)/vulnerabilities/queryFn/queryFn";
import { AllVulnerabilitiesType } from "@/app/(dashboards)/vulnerabilities/types/types";
import EmptyTableSkeleton from "@/components/emptyTableSkeleton";
import { getAllDependencies, getAllLicences as getAllLicenses } from "@/helpers/githubApp/githubApi";
import { TAllDependencies } from "@/types/dependencies.types";
import { IAllLicenses } from "@/types/licenses.types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { parseAsInteger, useQueryState } from "nuqs";
import React, { useState } from "react";
import DependenciesSearchArea from "../../dependencies/_components/DependenciesSearchArea";
import { DependenciesTable } from "../[id]/details/_components/DependencyTable";
import LicensesSearchArea from "../[id]/details/_components/LicensesSearchArea";
import { LicensesTable } from "../[id]/details/_components/LicensesTable";
import VulnabalitiesSearchArea from "../[id]/details/_components/vulnabilitiesSearchArea";

interface TabContentProps {
  repoId: string;
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ repoId, activeTab }) => {
  // const {id: repoId} = useParams()
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useState<number>(10);
  const session = useSession();


  const { data: allVulnerabilities, isFetching: allVulnerabilitiesLoading } = useQuery<AllVulnerabilitiesType>({
    queryKey: ["allVulnerabilities", session, repoId, page, limit],
    queryFn: () => getAllVulnerabilitiesByRepo(session, repoId, page, limit)
  });

  const { data: allDependencyData } = useQuery<TAllDependencies>({
    queryKey: ["AllDependency", session, page, limit],
    queryFn: () => getAllDependencies(repoId, session, page, limit)
  });

  const { data: allLicenseData } = useQuery<IAllLicenses>({
    queryKey: ["AllLicense", session, page, limit],
    queryFn: () => getAllLicenses(repoId, session, page, limit)
  });

  return (
    <div className="pt-4">
      {activeTab === "vulnerabilities" && (
        <>
          <VulnabalitiesSearchArea />
          {
            allVulnerabilitiesLoading ?
              <EmptyTableSkeleton /> :
              <VulnerabilityTable
                allVulnerabilities={allVulnerabilities}
                page={page}
                setPage={setPage}
                limit={limit}
              />
          }
        </>
      )}
      {activeTab === "dependencies" && (
        <>
          <DependenciesSearchArea />
          <DependenciesTable
            dependencies={allDependencyData?.data}
            totalCountAndLimit={{
              totalCount: allDependencyData?.count ?? 0,
              size: 10
            }}
            currentPage={page}
            loading={false}
            activeTab={activeTab}
            repoId={repoId}
          />
        </>
      )}
      {activeTab === "licenses" && (
        <>
          <LicensesSearchArea />
          <LicensesTable
            licenses={allLicenseData?.data}
            totalCountAndLimit={{
              totalCount: allLicenseData?.count || 0,
              size: 10
            }}
            currentPage={page}
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
