import { GenericTable } from '@/components/GenericTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dependency,
  TDependenciesTableProps,
} from '@/types/dependencies.types';
import { ColumnDef } from '@tanstack/react-table';
import { BadgeCheck, Flame } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { AllDependenciesPagination } from './AllDependenciesPagination';

export const AllDependenciesTable: React.FC<TDependenciesTableProps> = ({
  dependencies = [],
  refetch,
  totalCountAndLimit = { totalCount: 0, size: 10 },
  currentPage,
  loading = false,
}) => {
  const columns: ColumnDef<Dependency>[] = [
    {
      accessorKey: 'name',
      header: () => <div className='text-bold'>Name</div>,
      cell: ({ row }: { row: any }) => (
        <div className='text-medium'>{row.original.name || '-'}</div>
      ),
    },
    {
      accessorKey: 'vulnerabilityCount',
      header: () => <div className='text-bold'>Total Vulnerabilities</div>,
      cell: ({ row }: { row: any }) => (
        <div className='text-medium'>
          {row.getValue('vulnerabilityCount') || '-'}
        </div>
      ),
    },
    // {
    //     accessorKey: "vulnerabilityPriority",
    //     header: () => <div className="text-bold">Vulnerabilities Priority</div>,
    //     cell: ({ row }: { row: any }) => (
    //         <div className="flex gap-2">
    //             {row.getValue("vulnerabilityPriority").map((priority: string, index: number) => (
    //                 <Badge key={index} className={getBadgeVariant(priority)}>
    //                     {priority}
    //                 </Badge>
    //             ))}
    //         </div>
    //     ),
    // },
    {
      accessorKey: 'license',
      header: () => <div className='text-bold'>Licenses</div>,
      cell: ({ row }: { row: any }) => (
        <div className='text-medium'>{row.getValue('license') || '-'}</div>
      ),
    },
    {
      accessorKey: 'trustScore',
      header: 'Trust Score',
      cell: ({ row }: { row: any }) => {
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
              className={`inline-flex items-center gap-1 ${getBadgeColor(parseInt((popularity * 100).toString(), 10))}`}
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
    // {
    //   accessorKey: 'health',
    //   header: () => <div className='text-bold'>Health</div>,
    //   cell: ({ row }: { row: any }) => (
    //     <div className='inline-flex gap-1'>
    //       <Badge
    //         className={`inline-flex items-center gap-1 ${getHealthBadgeVariant(row.getValue('health').popularity)}`}
    //       >
    //         <Flame size={16} /> {row.getValue('health').popularity}
    //       </Badge>
    //       <Badge
    //         className={`inline-flex items-center gap-1 ${getHealthBadgeVariant(row.getValue('health').contribution)}`}
    //       >
    //         <Handshake size={16} /> {row.getValue('health').contribution}
    //       </Badge>
    //     </div>
    //   ),
    // },
    {
      id: 'actions',
      header: () => <div className='text-bold pr-4 text-start'>Actions</div>,
      enableHiding: false,
      cell: ({ row }) => (
        <div className='flex items-center justify-end space-x-4 pr-4'>
          <Link href={`/dependencies/${row.original.dependencyId}`}>
            <Button variant='outline'>View</Button>
          </Link>
        </div>
      ),
    },
  ];

  const headerClassNames = {
    actions: 'text-right w-[110px]',
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

  return (
    <GenericTable
      columns={columns}
      data={dependencies}
      refetch={refetch}
      totalCountAndLimit={totalCountAndLimit}
      currentPage={currentPage}
      loading={loading}
      headerClassNames={headerClassNames}
      cellClassNames={cellClassNames}
      PaginationComponent={AllDependenciesPagination}
    />
  );
};
