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
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { VulnabilitiesPagination } from "./VulnabilitiesPagination";

type Vulnerability = {
    name: string;
    discovered: string;
    severity: string;
    dependency: string;
    exploited: string;
};

const getBadgeVariant = (severity: string) => {
    switch (severity) {
        case "Critical":
            return "text-[#B91C1C] bg-[#FEF2F2] hover:bg-[#FEF2F2] font-normal";
        case "High":
            return "text-[#B45309] bg-[#FDEBDD] hover:bg-[#FDEBDD] font-normal";
        case "Medium":
            return "text-[#0284C7] bg-[#DDF3FD] hover:bg-[#DDF3FD] font-normal";
        case "Low":
            return "text-[#166534] bg-[#DCFCE7] hover:bg-[#DCFCE7] font-normal";
        default:
            return "text-[#0F172A] bg-[#F1F5F9] hover:bg-[#F1F5F9] font-normal";
    }
};

export const columns: ColumnDef<Vulnerability>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-bold">Name</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("name") || "-"}</div>
        ),
    },
    {
        accessorKey: "discovered",
        header: () => <div className="text-bold">Discovered</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("discovered") || "-"}</div>
        ),
    },
    {
        accessorKey: "severity",
        header: () => <div className="text-bold">Severity</div>,
        cell: ({ row }: { row: any }) => (
            <Badge className={getBadgeVariant(row.getValue("severity"))}>
                {row.getValue("severity")}
            </Badge>
        ),
    },
    {
        accessorKey: "dependency",
        header: () => <div className="text-bold">Dependency</div>,
        cell: ({ row }: { row: any }) => (
            <Badge className="inline-flex items-center gap-1 bg-white text-black hover:bg-white text-nowrap">
                {row.getValue("dependency")} <ExternalLink size={16} />
            </Badge>
        ),
    },
    {
        accessorKey: "exploited",
        header: () => <div className="text-bold">Exploited (CISA)</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("exploited") || "-"}</div>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-bold text-start pr-4">Action</div>,
        enableHiding: false,
        cell: ({ row }) => (
            <div className="flex items-center justify-end space-x-4 pr-4">
                <Link href={`http://localhost:3000/repositories/${12}/details`}><Button variant="outline">View</Button></Link>
            </div>
        ),
    },
];

type TVulnerabilityTableProps = {
    vulnerabilities?: Vulnerability[];
    refetch?: () => void;
    totalCountAndLimit?: { totalCount: number; size: number };
    currentPage: number;
    loading?: boolean;
};

export const VulnerabilityTable: React.FC<TVulnerabilityTableProps> = ({
    vulnerabilities = [],
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
        data: vulnerabilities,
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
            ? (currentPageState - 1) * pagination.pageSize + vulnerabilities.length
            : vulnerabilities.length;

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
                                                    ? "text-right"
                                                    : header.column.id === "name"
                                                        ? "min-w-[300px]"
                                                        : header.column.id === "discovered"
                                                            ? "min-w-[200px]"
                                                            : header.column.id === "severity"
                                                                ? "min-w-[200px]"
                                                                : header.column.id === "dependency"
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
                                                            : cell.column.id === "discovered"
                                                                ? "text-start pl-4"
                                                                : cell.column.id === "severity"
                                                                    ? "pl-4 text-start"
                                                                    : cell.column.id === "dependency"
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
                            <VulnabilitiesPagination
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