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
import { AllLicensesPagination } from "./AllLicensesPagiantion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type License = {
    name: string;
    licenseRisk: string;
    dependencies: number;
    licenseFamily: string;
    affectedRepositories: string[];
};

const getBadgeVariant = (risk: string) => {
    switch (risk) {
        case "Critical":
            return "text-[#B91C1C] bg-[#FEF2F2] font-normal";
        case "High":
            return "text-[#B45309] bg-[#FDEBDD] font-normal";
        case "Medium":
            return "text-[#0284C7] bg-[#DDF3FD] font-normal";
        case "Low":
            return "text-[#166534] bg-[#DCFCE7] font-normal";
        case "Unknown":
            return "text-[#0F172A] bg-[#F1F5F9] font-normal";
        default:
            return "text-[#0F172A] bg-[#F1F5F9] font-normal";
    }
};

export const columns: ColumnDef<License>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-bold">Name</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("name") || "-"}</div>
        ),
    },
    {
        accessorKey: "licenseRisk",
        header: () => <div className="text-bold">License Risk</div>,
        cell: ({ row }: { row: any }) => (
            <Badge className={getBadgeVariant(row.getValue("licenseRisk"))}>
                {row.getValue("licenseRisk")}
            </Badge>
        ),
    },
    {
        accessorKey: "affectedRepositories",
        header: () => <div className="text-bold">Affected Repositories</div>,
        cell: ({ row }: { row: any }) => {
            const repos = row.getValue("affectedRepositories");
            return (
                <div className="flex items-center space-x-2">
                    {repos.length === 1 ? (
                        <>
                            <Badge className="inline-flex items-center gap-x-2 text-black bg-white border-lightborderColor hover:bg-white hover:cursor-pointer ">
                                {repos[0]}
                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            </Badge>
                        </>
                    ) : (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Badge className="bg-white text-black hover:bg-white border-lightborderColor">+{repos.length}</Badge>
                                </TooltipTrigger>
                                <TooltipContent className="p-4 text-black bg-white border">
                                    <p>{repos.join(", ")}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )
                    }
                </div >
            );
        },
    },
    {
        accessorKey: "dependencies",
        header: () => <div className="text-bold">Dependencies</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("dependencies") || "-"}</div>
        ),
    },
    {
        accessorKey: "licenseFamily",
        header: () => <div className="text-bold">License Family</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("licenseFamily") || "-"}</div>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-bold text-start pr-4">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => (
            <div className="flex items-center justify-end space-x-4 pr-4">
                <Link href={`/licenses/${12}`}><Button variant="outline">View</Button></Link>
            </div>
        ),
    },
];

type TAllLicensesTableProps = {
    licenses?: License[];
    refetch?: () => void;
    totalCountAndLimit?: { totalCount: number; size: number };
    currentPage: number;
    loading?: boolean;
};

export const AllLicensesTable: React.FC<TAllLicensesTableProps> = ({
    licenses = [],
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
        data: licenses,
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
            ? (currentPageState - 1) * pagination.pageSize + licenses.length
            : licenses.length;

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
                                                        : header.column.id === "licenseRisk"
                                                            ? "min-w-[200px]"
                                                            : header.column.id === "dependencies"
                                                                ? "min-w-[200px]"
                                                                : header.column.id === "licenseFamily"
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
                                                        ? "text-right w-[115px]"
                                                        : cell.column.id === "name"
                                                            ? "pl-4 text-start"
                                                            : cell.column.id === "licenseRisk"
                                                                ? "text-start pl-4"
                                                                : cell.column.id === "dependencies"
                                                                    ? "pl-4 text-start"
                                                                    : cell.column.id === "licenseFamily"
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
                            <AllLicensesPagination
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