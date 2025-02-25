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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SharePagination } from "./sharePagination";
import Image from 'next/image';
import { Github, Gitlab } from "lucide-react";
import CustomAlertDialog from "./CustomAlartDialog";

type ShareData = {
    sharedBy: { name: string; avatarUrl: string };
    sharedRepositories: number;
    platform: string;
};

export const columns: ColumnDef<ShareData>[] = [
    {
        accessorKey: "sharedBy",
        header: () => <div className="text-bold">Shared By</div>,
        cell: ({ row }: { row: any }) => (
            <div className="flex items-center">
                <Avatar className="w-8 h-8 rounded-full mr-2">
                    <AvatarImage src={row.original.sharedBy.avatarUrl} alt={row.original.sharedBy.name} />
                    <AvatarFallback>{row.original.sharedBy.name[0]}</AvatarFallback>
                </Avatar>
                <span>{row.original.sharedBy.name}</span>
            </div>
        ),
    },
    {
        accessorKey: "sharedRepositories",
        header: () => <div className="text-bold">Shared Repositories</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("sharedRepositories") || "-"}</div>
        ),
    },
    {
        accessorKey: "platform",
        header: () => <div className="text-bold">Platform</div>,
        cell: ({ row }: { row: any }) => (
            <div className="flex items-center">
                {row.original.platform === "GitHub" && <Github size={16} className="mr-2" />}
                {row.original.platform === "GitLab" && <Gitlab size={16} className="mr-2" />}
                {row.original.platform === "BitBucket" && (
                    <Image src="/logo/Bitbucket.svg" alt="BitBucket" width={16} height={16} className="mr-2" />
                )}
                {/* <span>{row.original.platform}</span> */}
            </div>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-bold text-start pr-4">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => (
            <div className="flex items-center justify-end space-x-4 pr-4">
                <Button variant="outline">View</Button>
                <CustomAlertDialog trigger={<Button variant="destructive">Remove</Button>} />
            </div>
        ),
    },
];

type TShareTableProps = {
    data?: ShareData[];
    refetch?: () => void;
    totalCountAndLimit?: { totalCount: number; size: number };
    currentPage: number;
    loading?: boolean;
};

export const ShareTable: React.FC<TShareTableProps> = ({
    data = [],
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
            ? (currentPageState - 1) * pagination.pageSize + data.length
            : data.length;

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
                                                    ? "text-right w-[225px]"
                                                    : header.column.id === "sharedBy"
                                                        ? "min-w-[300px]"
                                                        : header.column.id === "sharedRepositories"
                                                            ? "min-w-[200px]"
                                                            : header.column.id === "platform"
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
                                                        : cell.column.id === "sharedBy"
                                                            ? "pl-4 text-start"
                                                            : cell.column.id === "sharedRepositories"
                                                                ? "text-start pl-4"
                                                                : cell.column.id === "platform"
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
                            <SharePagination
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