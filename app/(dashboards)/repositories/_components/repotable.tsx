import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RepoPagination } from './repoPagination';
import Link from 'next/link';
import { getBadgeVariant, getSeverityCount } from '@/constants/globalFunctions';
import { Repository, TRepoTableProps } from '@/types/repo.types';
import { GenericTable } from '@/components/GenericTable';
import { cellClassNames, headerClassNames } from '@/constants/TableItems';

export const RepoTable: React.FC<TRepoTableProps> = ({
  repos = [],
  refetch,
  totalCountAndLimit = { totalCount: 0, size: 10 },
  currentPage,
  loading = false,
}) => {
  //   console.log('🚀 ~ repos:--------------------', repos);
  const columns: ColumnDef<Repository>[] = [
    {
      accessorKey: 'repoName',
      header: () => <div className='text-bold'>Repository Name</div>,
      cell: ({ row }: { row: any }) => (
        <div className='text-medium'>{row.original?.repoName || '-'}</div>
      ),
    },
    {
      accessorKey: 'totalVulnerabilities',
      header: () => <div className='text-bold'>Total Vulnerabilities</div>,
      cell: ({ row }: { row: any }) => (
        <div className='text-medium'>
          {row.getValue('totalVulnerabilities') || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'vulnerabilities',
      header: () => <div className='text-bold'>Vulnerabilities</div>,
      cell: ({ row }: { row: any }) => {
        const vulnerabilities = row.original.vulnerabilities;
        if (!vulnerabilities || vulnerabilities.length === 0) {
          return <div className='text-medium'>-</div>;
        }
        const severities = ['Critical', 'High', 'Medium', 'Low', 'Unknown'];
        return (
          <div className='flex flex-wrap gap-2'>
            {severities.map((severity: string) => {
              const count: any = getSeverityCount(vulnerabilities, severity);
              return count > 0 ? (
                <Badge key={severity} className={getBadgeVariant(severity)}>
                  {severity} {count}
                </Badge>
              ) : null;
            })}
          </div>
        );
      },
    },
    {
      accessorKey: 'sharingDetails',
      header: () => <div className='text-bold'>Sharing Details</div>,
      cell: ({ row }: { row: any }) => {
        const sharingDetails = row.original.sharingDetails;
        if (!sharingDetails || sharingDetails.length === 0) {
          return <div className='text-medium'>-</div>;
        }
        return (
          <div className='flex -space-x-2'>
            {sharingDetails.map((user: any) => (
              <Avatar key={user.id} className='h-8 w-8'>
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className='text-bold pr-4 text-start'>Actions</div>,
      enableHiding: false,
      cell: () => (
        <div className='flex items-center justify-end space-x-4 pr-4'>
          <Link href={`/repositories/${12}/details`}>
            <Button variant='outline'>View</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <GenericTable
      columns={columns}
      data={repos}
      refetch={refetch}
      totalCountAndLimit={totalCountAndLimit}
      currentPage={currentPage}
      loading={loading}
      headerClassNames={headerClassNames}
      cellClassNames={cellClassNames}
      PaginationComponent={RepoPagination}
    />
  );
};
