import React from 'react';
import { GenericTable } from '@/components/GenericTable';
import { Badge } from '@/components/ui/badge';
import { getBadgeVariant } from '@/constants/globalFunctions';
import { TLicensesTableProps } from '@/types/licenses.types';

import { LicensesPagination } from './licensesPagination';
import { createColumns } from '@/components/ColumnDefinations';

const columnsProps = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (row: any) => (
      <div className='text-medium'>{row?.original.license || '-'}</div>
    ),
  },
  {
    accessorKey: 'licenseRisk',
    header: 'License Risk',
    cell: (row: any) => (
      <Badge className={getBadgeVariant(row?.original.licenseRisk || '-')}>
        {row?.original.licenseRisk || '-'}
      </Badge>
    ),
  },
  {
    accessorKey: 'dependencies',
    header: 'Dependencies',
    cell: (row: any) => (
      <div className='text-medium'>{row?.original.dependencyCount || '-'}</div>
    ),
  },
  {
    accessorKey: 'licenseFamily',
    header: 'License Family',
    cell: (row: any) => (
      <div className='text-medium'>{row?.original.licenseFamily || '-'}</div>
    ),
  },
];

const headerClassNames = {
  name: 'min-w-[300px]',
  licenseRisk: 'min-w-[200px]',
  dependencies: 'min-w-[200px]',
  licenseFamily: 'min-w-[200px]',
};

const cellClassNames = {
  name: 'pl-4 text-start',
  licenseRisk: 'text-start pl-4',
  dependencies: 'pl-4 text-start',
  licenseFamily: 'pl-4 text-start',
};

export const LicensesTable: React.FC<TLicensesTableProps> = ({
  licenses = [],
  refetch,
  totalCountAndLimit = { totalCount: 0, size: 10 },
  currentPage,
  loading = false,
}) => {
  const columns = createColumns(columnsProps);

  return (
    <GenericTable
      columns={columns}
      data={licenses}
      refetch={refetch}
      totalCountAndLimit={totalCountAndLimit}
      currentPage={currentPage}
      loading={loading}
      headerClassNames={headerClassNames}
      cellClassNames={cellClassNames}
      PaginationComponent={LicensesPagination}
    />
  );
};
