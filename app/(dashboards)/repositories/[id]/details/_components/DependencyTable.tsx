import React from 'react';
import { GenericTable } from '@/components/GenericTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Flame } from 'lucide-react';
import Link from 'next/link';
import {
  TDependenciesTableProps,
  TDependency,
} from '@/types/dependencies.types';
import {
  getBadgeVariant,
  getHealthBadgeVariant,
} from '@/constants/globalFunctions';
import { DependenciesPagination } from './DependenciesPagination';
import { createColumns } from '@/components/ColumnDefinations';

const columnsProps = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (row: any) => (
      <div className='text-medium'>
        {row.original?.dependencyId?.dependencyName || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'totalVulnerabilities',
    header: 'Total Vulnerabilities',
    cell: (row: any) => (
      <div className='text-medium'>
        {row?.getValue('totalVulnerabilities') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'licenses',
    header: 'Licenses',
    cell: (row: any) => (
      <div className='text-medium'>
        {row?.original?.dependencyId?.license || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'trustScore',
    header: 'Trust Score',
    cell: (row: any) => {
      const scoreDetail = row?.original?.dependencyId?.score?.detail;
      const popularity = scoreDetail?.popularity;
      const quality = scoreDetail?.quality;

      const getBadgeColor = (value: number | undefined) => {
        if (value === undefined || value === null)
          return 'bg-[#6b7280] text-white';
        if (value >= 0 && value <= 29) return 'bg-[#b91c1c] text-white';
        if (value >= 30 && value <= 69) return 'bg-[#b45309] text-white';
        if (value >= 70 && value <= 100) return 'bg-[#15803d] text-white';
        return 'bg-[#6b7280] text-white';
      };

      return (
        <div className='inline-flex gap-1'>
          {popularity !== undefined ? (
            <Badge
              className={`inline-flex items-center gap-1 ${getBadgeColor(popularity)}`}
            >
              <Flame size={16} /> {Math.round(popularity)}
            </Badge>
          ) : (
            <div
              className={`inline-flex items-center gap-1 ${getBadgeColor(popularity)} rounded-full px-4 py-1`}
            >
              Unknown
            </div>
          )}

          {quality !== undefined ? (
            <Badge
              className={`inline-flex items-center gap-1 ${getBadgeColor(quality)}`}
            >
              <BadgeCheck size={16} /> {Math.round(quality)}
            </Badge>
          ) : (
            <div
              className={`inline-flex items-center gap-1 ${getBadgeColor(quality)} rounded-full px-4`}
            >
              Unknown
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: () => (
      <div className='flex items-center justify-end space-x-4 pr-4'>
        <Link href={`http://localhost:3000/repositories/${12}/details`}>
          <Button variant='outline'>View</Button>
        </Link>
      </div>
    ),
  },
];

const headerClassNames = {
  actions: 'w-[110px]',
  name: 'min-w-[300px]',
  totalVulnerabilities: 'min-w-[200px]',
  vulnerabilityPriority: 'min-w-[200px]',
  licenses: 'min-w-[200px]',
  health: 'min-w-[200px]',
};

const cellClassNames = {
  actions: 'text-right',
  name: 'pl-4 text-start',
  totalVulnerabilities: 'text-start pl-4',
  vulnerabilityPriority: 'pl-4 text-start',
  licenses: 'pl-4 text-start',
  health: 'pl-4 text-start',
};

export const DependenciesTable: React.FC<{
  dependencies?: TDependency;
  refetch?: () => void;
  totalCountAndLimit?: { totalCount: number; size: number };
  currentPage?: number;
  loading?: boolean;
}> = ({
  dependencies = [],
  refetch,
  totalCountAndLimit = { totalCount: 0, size: 10 },
  currentPage,
  loading = false,
}) => {
  const columns = createColumns(columnsProps);

  return (
    <GenericTable
      columns={columns}
      data={dependencies}
      refetch={refetch}
      totalCountAndLimit={totalCountAndLimit}
      currentPage={currentPage ?? 1}
      loading={loading}
      headerClassNames={headerClassNames}
      cellClassNames={cellClassNames}
      PaginationComponent={DependenciesPagination}
    />
  );
};
