import React, { useState, useEffect } from "react";
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
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useSearchParams } from "next/navigation";
import EmptyTableSkeleton from "@/components/emptyTableSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddRepoPagination } from "./AddRepoPagination";

type Repository = {
    name: string;
    useCase: string;
};


export const columns: ColumnDef<Repository>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-bold">Repository Name</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("name") || "-"}</div>
        ),
    },
    {
        accessorKey: "useCase",
        header: () => <div className="text-bold">Use Case</div>,
        cell: ({ row }: { row: any }) => (
            <Badge className="text-black bg-white border-lightborderColor font-normal">
                {row.getValue("useCase")}
            </Badge>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-bold text-start pr-4">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => {
            const [added, setAdded] = useState(false);

            return (
                <div className="flex items-center justify-end space-x-4 pr-4">
                    <Button
                        variant={added ? "nonedisable" : "outline"}
                        onClick={() => setAdded(true)}
                    >
                        {added ? "Added" : "Add"}
                    </Button>
                </div>
            );
        },
    },
];

type TAddRepoTableProps = {
    repositories?: Repository[];
    refetch?: () => void;
    totalCountAndLimit?: { totalCount: number; size: number };
    currentPage: number;
    loading?: boolean;
};

export const AddRepoTable: React.FC<TAddRepoTableProps> = ({
    repositories = [],
    refetch,
    totalCountAndLimit = { totalCount: 0, size: 10 },
    currentPage,
    loading,
}) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [pagination] = useState({
        pageIndex: currentPage - 1,
        pageSize: 10,
    });
    const searchParams = useSearchParams();
    const page = parseInt(searchParams?.get("page") || "1");
    const [currentPageState, setCurrentPageState] = useState(page);
    const [isLoading, setIsLoading] = useState(false);
    const totalPages = totalCountAndLimit.totalCount
        ? Math.ceil(totalCountAndLimit.totalCount / totalCountAndLimit.size)
        : 0;

    const table = useReactTable({
        data: repositories,
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
            ? (currentPageState - 1) * pagination.pageSize + repositories.length
            : repositories.length;

    return (
        <div className="w-full">
            {isLoading ? (
                <EmptyTableSkeleton />
            ) : (
                <>
                    <div className="overflow-hidden rounded-lg border border-lightborderColor mt-6 lg:mt-0">
                        <Table className="!rounded-lg !min-w-[600px]">
                            <TableHeader className="border-b-[1px] text-inputFooterColor">
                                {table.getHeaderGroups().map((headerGroup: any) => (
                                    <TableRow key={headerGroup.id} className="py-1 leading-none">
                                        {headerGroup.headers.map((header: any) => (
                                            <TableHead
                                                key={header.id}
                                                className={`text-left h-[51px] pl-4 leading-none ${header.column.id === "actions"
                                                    ? "text-right min-w-[100px]"
                                                    : header.column.id === "name"
                                                        ? "min-w-[300px]"
                                                        : header.column.id === "useCase"
                                                            ? "min-w-[200px]"
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
                                                        ? "text-right"
                                                        : cell.column.id === "name"
                                                            ? "pl-4 text-start"
                                                            : cell.column.id === "useCase"
                                                                ? "text-start pl-4"
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
                            <AddRepoPagination
                                currentPage={currentPageState}
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