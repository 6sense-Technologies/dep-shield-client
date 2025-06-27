import { createColumns } from '@/components/ColumnDefinations';
import { GenericTable } from '@/components/GenericTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Flame } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { DependenciesPagination } from './DependenciesPagination';

const columnsProps = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (row: any) => (
      <div className='text-medium'>{row.original?.name || '-'}</div>
    ),
  },
  {
    accessorKey: 'vulnerabilityCount',
    header: 'Total Vulnerabilities',
    cell: (row: any) => (
      <div className='text-medium'>
        {row?.getValue('vulnerabilityCount') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'license',
    header: 'Licenses',
    cell: (row: any) => (
      <div className='text-medium'>{row?.original?.license || '-'}</div>
    ),
  },
  {
    accessorKey: 'trustScore',
    header: 'Trust Score',
    cell: (row: any) => {
      const popularity = row?.original?.popularity;
      const quality = row?.original?.quality;

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
          <Badge
            className={`inline-flex items-center gap-1 rounded-full ${getBadgeColor(parseInt((popularity * 100).toString(), 10))}`}
          >
            <Flame className='h-4 w-4' />
            {popularity !== undefined
              ? parseInt((popularity * 100).toString(), 10)
              : '-'}
          </Badge>

          <Badge
            className={`inline-flex items-center gap-1 rounded-full ${getBadgeColor(parseInt((quality * 100).toString(), 10))}`}
          >
            <BadgeCheck className='h-4 w-4' />
            {quality !== undefined
              ? parseInt((quality * 100).toString(), 10)
              : '-'}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: (row: any) => (
      <div className='flex items-center justify-end space-x-4 pr-4'>
        <Link
          href={
            row?.original?.dependencyId
              ? `/dependencies/${row?.original?.dependencyId}`
              : '#'
          }
        >
          <Button variant='outline' disabled={!row?.original?.dependencyId}>
            View
          </Button>
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
  dependencies?: any;
  refetch?: () => void;
  totalCountAndLimit?: { totalCount: number; size: number };
  currentPage?: number;
  loading?: boolean;
  activeTab: string;
  repoId: string;
}> = ({
  dependencies = [],
  refetch,
  totalCountAndLimit = { totalCount: 0, size: 10 },
  currentPage,
  loading = false,
  activeTab,
  repoId
}) => {
  const columns = createColumns(columnsProps);
  console.log('dependencies', dependencies);
  return (
    <GenericTable
      columns={columns}
      data={dependencies || []}
      refetch={refetch}
      totalCountAndLimit={totalCountAndLimit}
      currentPage={currentPage ?? 1}
      loading={loading}
      headerClassNames={headerClassNames}
      cellClassNames={cellClassNames}
      PaginationComponent={DependenciesPagination}
      basePath={`/repositories/${repoId}/details?tab=${activeTab}`}
    />
  );
};
