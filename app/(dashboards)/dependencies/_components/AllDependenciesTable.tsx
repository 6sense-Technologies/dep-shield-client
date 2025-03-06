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
import {Flame, Handshake } from "lucide-react";
import Link from "next/link";
import { AllDependenciesPagination } from "./AllDependenciesPagination";


type Dependency = {
    name: string;
    totalVulnerabilities: number;
    vulnerabilityPriority: string[];
    licenses: string;
    health: {
        popularity: number;
        contribution: number;
    };
};

const getBadgeVariant = (priority: string) => {
    switch (priority) {
        case "Critical":
            return "text-[#B91C1C] bg-[#FEF2F2] hover:bg-[#FEF2F2] font-normal";
        case "High":
            return "text-[#B45309] bg-[#FDEBDD]  hover:bg-[#FDEBDD] font-normal";
        case "Medium":
            return "text-[#0284C7] bg-[#DDF3FD] hover:bg-[#DDF3FD]  font-normal";
        case "Low":
            return "text-[#166534] bg-[#DCFCE7] hover:bg-[#DCFCE7] font-normal";
        default:
            return "text-[#0F172A] bg-[#F1F5F9] hover:bg-[#F1F5F9] font-normal";
    }
};

const getHealthBadgeVariant = (value: number) => {
    if (value === null) {
        return "text-[#020617] bg-[#F1F5F9] hover:bg-[#F1F5F9] font-normal";
    } else if (value >= 0 && value <= 30) {
        return "text-[#FFFFFF] bg-[#B91C1C] hover:bg-[#B91C1C] font-normal";
    } else if (value >= 31 && value <= 70) {
        return "text-[#FFFFFF] bg-[#B45309] hover:bg-[#B45309] font-normal";
    } else {
        return "text-[#FFFFFF] bg-[#15803D] hover:bg-[#15803D] font-normal";
    }
};

export const columns: ColumnDef<Dependency>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-bold">Name</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("name") || "-"}</div>
        ),
    },
    {
        accessorKey: "totalVulnerabilities",
        header: () => <div className="text-bold">Total Vulnerabilities</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("totalVulnerabilities") || "-"}</div>
        ),
    },
    {
        accessorKey: "vulnerabilityPriority",
        header: () => <div className="text-bold">Vulnerabilities Priority</div>,
        cell: ({ row }: { row: any }) => (
            <div className="flex gap-2">
                {row.getValue("vulnerabilityPriority").map((priority: string, index: number) => (
                    <Badge key={index} className={getBadgeVariant(priority)}>
                        {priority}
                    </Badge>
                ))}
            </div>
        ),
    },
    {
        accessorKey: "licenses",
        header: () => <div className="text-bold">Licenses</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("licenses") || "-"}</div>
        ),
    },
    {
        accessorKey: "health",
        header: () => <div className="text-bold">Health</div>,
        cell: ({ row }: { row: any }) => (
            <div className="inline-flex gap-1">
                <Badge className={`inline-flex items-center gap-1 ${getHealthBadgeVariant(row.getValue("health").popularity)}`}>
                    <Flame size={16} /> {row.getValue("health").popularity}
                </Badge>
                <Badge className={`inline-flex items-center gap-1 ${getHealthBadgeVariant(row.getValue("health").contribution)}`}>
                    <Handshake size={16} /> {row.getValue("health").contribution}
                </Badge>
            </div>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-bold text-start pr-4">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => (
            <div className="flex items-center justify-end space-x-4 pr-4">
                <Link href={`/dependencies/${12}`}><Button variant="outline">View</Button></Link>
            </div>
        ),
    },
];

type TDependenciesTableProps = {
    dependencies?: Dependency[];
    refetch?: () => void;
    totalCountAndLimit?: { totalCount: number; size: number };
    currentPage: number;
    loading?: boolean;
};

export const AllDependenciesTable: React.FC<TDependenciesTableProps> = ({
    dependencies = [],
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
        data: dependencies,
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
            ? (currentPageState - 1) * pagination.pageSize + dependencies.length
            : dependencies.length;

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
                                                    ? "text-right w-[110px]"
                                                    : header.column.id === "name"
                                                        ? "min-w-[300px]"
                                                        : header.column.id === "totalVulnerabilities"
                                                            ? "min-w-[200px]"
                                                            : header.column.id === "vulnerabilityPriority"
                                                                ? "min-w-[200px]"
                                                                : header.column.id === "licenses"
                                                                    ? "min-w-[200px]"
                                                                    : header.column.id === "health"
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
                                                            : cell.column.id === "totalVulnerabilities"
                                                                ? "text-start pl-4"
                                                                : cell.column.id === "vulnerabilityPriority"
                                                                    ? "pl-4 text-start"
                                                                    : cell.column.id === "licenses"
                                                                        ? "pl-4 text-start"
                                                                        : cell.column.id === "health"
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
                            <AllDependenciesPagination
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