import React, { useState, useEffect } from "react";
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import EmptyTableSkeleton from "@/components/emptyTableSkeleton";
import { Button } from "@/components/ui/button";
import { SingleRepoPagination } from "./SingleRepoPagination";
import { Repository, TSingleRepoTableProps } from "@/types/tableprops.types";


export const columns: ColumnDef<Repository>[] = [
    {
        accessorKey: "repositoryName",
        header: () => <div className="text-bold">Repository Name</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("repositoryName") || "-"}</div>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-bold text-start pr-4">Actions</div>,
        enableHiding: false,
        cell: () => (
            <div className="flex items-center justify-end space-x-4 pr-4">
                <Button variant="outline">View</Button>
            </div>
        ),
    },
];



export const SingleRepoTable: React.FC<TSingleRepoTableProps> = ({
    repos = [],
    refetch,
    totalCountAndLimit = { totalCount: 0, size: 10 },
    currentPage,
    loading,
}) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination] = useState({
        pageIndex: currentPage - 1,
        pageSize: 10,
    });
    const totalPages = totalCountAndLimit.totalCount
        ? Math.ceil(totalCountAndLimit.totalCount / totalCountAndLimit.size)
        : 0;

    const table = useReactTable({
        data: repos,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            pagination,
        },
        manualPagination: true,
        pageCount: totalPages,
    });

    const onPageChange = (page: number): void => {
        setIsLoading(true);
        table.setPageIndex(page - 1);
        refetch?.();
    };

    useEffect(() => {
        if (!loading) {
            setIsLoading(false);
        }
    }, [loading]);

    const displayedRowsCount =
        currentPage > 1
            ? (currentPage - 1) * pagination.pageSize + repos.length
            : repos.length;

    return (
        <div className="w-full">
            {isLoading ? (
                <EmptyTableSkeleton />
            ) : (
                <>
                    <div className="overflow-hidden rounded-lg border border-lightborderColor mt-4 lg:mt-0">
                        <Table className="!rounded-lg !min-w-[600px]">
                            <TableHeader className="border-b-[1px] text-inputFooterColor">
                                {table.getHeaderGroups().map((headerGroup: any) => (
                                    <TableRow key={headerGroup.id} className="py-1 leading-none">
                                        {headerGroup.headers.map((header: any) => (
                                            <TableHead
                                                key={header.id}
                                                className={`text-left h-[51px] pl-4 leading-none ${header.column.id === "actions"
                                                    ? "text-right w-[115px]"
                                                    : header.column.id === "repositoryName"
                                                        ? "min-w-[300px]"
                                                        : "min-w-[200px]"
                                                    }`}
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
                                            data-state={row.getIsSelected() && "selected"}
                                            className="h-12 leading-none"
                                        >
                                            {row.getVisibleCells().map((cell: any) => (
                                                <TableCell
                                                    key={cell.id}
                                                    className={`py-1 leading-none ${cell.column.id === "actions"
                                                        ? "text-right pr-48"
                                                        : cell.column.id === "repositoryName"
                                                            ? "pl-4 text-start"
                                                            : "pl-4 text-start"
                                                        }`}
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
                                    <TableRow className="py-1 leading-none">
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="space-x-3 flex flex-col justify-center items-center lg:flex-row lg:items-center lg:justify-between lg:space-x-3 py-4 lg:py-4">
                        <div className="text-sm text-subHeading pl-2 md:pb-6">
                            {displayedRowsCount} of {totalCountAndLimit.totalCount} row(s)
                            showing
                        </div>
                        <div className="flex items-center md:justify-end mb-4 pt-4 md:pt-0">
                            <SingleRepoPagination
                                currentPage={currentPage}
                                totalPage={totalPages}
                                onPageChange={onPageChange}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};