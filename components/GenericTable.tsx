import React, { useState, useEffect } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import EmptyTableSkeleton from '@/components/emptyTableSkeleton';
import { Repository } from '@/types/repo.types';
import { GenericPagination } from './GenericPagination';

interface GenericTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[] | Repository[] | any[];
  refetch?: () => void;
  totalCountAndLimit: { totalCount: number | undefined; size: number };
  currentPage: number;
  loading: boolean;
  headerClassNames?: { [key: string]: string };
  cellClassNames?: { [key: string]: string };
  PaginationComponent?: React.ComponentType<{
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
  }>;
  basePath?: string;
}

export const GenericTable = <T,>({
  columns,
  data,
  refetch,
  totalCountAndLimit,
  currentPage,
  loading,
  headerClassNames = {},
  cellClassNames = {},
  basePath = '',
}: GenericTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination] = useState({
    pageIndex: currentPage - 1,
    pageSize: 10,
  });
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const [, setIsLoading] = useState(false);
  const totalPages = totalCountAndLimit.totalCount
    ? Math.ceil(totalCountAndLimit.totalCount / totalCountAndLimit.size)
    : 0;

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    manualPagination: true,
    pageCount: totalPages,
  });
  //   console.log('🚀 ~ data:', data);

  const onPageChange = (page: number): void => {
    setIsLoading(true);
    setCurrentPageState(page);
    table.setPageIndex(page - 1);
    refetch?.();
  };

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  const displayedRowsCount =
    currentPageState > 1
      ? (currentPageState - 1) * pagination.pageSize + data?.length
      : data?.length;

  return (
    <div className='w-full'>
      {loading ? (
        <EmptyTableSkeleton />
      ) : (
        <>
          <div className='mt-4 overflow-hidden rounded-lg border border-lightborderColor lg:mt-0'>
            <Table className='!min-w-[600px] !rounded-lg'>
              <TableHeader className='border-b-[1px] text-inputFooterColor'>
                {table.getHeaderGroups().map((headerGroup: any) => (
                  <TableRow key={headerGroup.id} className='py-1 leading-none'>
                    {headerGroup.headers.map((header: any) => (
                      <TableHead
                        key={header.id}
                        className={`h-[51px] pl-4 text-left leading-none ${headerClassNames[header.column.id] || ''}`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header as React.ReactNode,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row: any) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className='h-12 leading-none'
                    >
                      {row.getVisibleCells().map((cell: any) => (
                        <TableCell
                          key={cell.id}
                          className={`py-1 leading-none ${cellClassNames[cell.column.id] || ''}`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell as React.ReactNode,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className='py-1 leading-none'>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='flex flex-col items-center justify-center space-x-3 py-4 lg:flex-row lg:items-center lg:justify-between lg:space-x-3 lg:py-4'>
            <div className='pl-2 text-sm text-subHeading md:pb-6'>
              {displayedRowsCount} of {totalCountAndLimit.totalCount} row(s)
              showing
            </div>
            <div className='mb-4 flex items-center pt-4 md:justify-end md:pt-0'>
              <GenericPagination
                currentPage={currentPageState}
                totalPage={totalPages}
                onPageChange={onPageChange}
                basePath={basePath}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
