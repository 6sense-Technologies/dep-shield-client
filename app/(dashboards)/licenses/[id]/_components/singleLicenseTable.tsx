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
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { SingleLicensesPagination } from "./singleLicensesPagination";

type Licenses = {
    repositoryName: string;
    licenseRisk: string;
    licenseFamily: string;
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

export const columns: ColumnDef<Licenses>[] = [
    {
        accessorKey: "repositoryName",
        header: () => <div className="text-bold">Repositories</div>,
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("repositoryName") || "-"}</div>
        ),
    },
    {
        accessorKey: "licenseRisk",
        header: () => <div className="text-bold">License Risk</div>,
        cell: ({ row }: { row: any }) => {
            const licenseRisk = row.getValue("licenseRisk");
            return (
                <Badge className={getBadgeVariant(licenseRisk)}>
                    {licenseRisk}
                </Badge>
            );
        },
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

                <ExternalLink size={16} />

            </div>
        ),
    },
];

type TSingleLicenseTableProps = {
    licenses?: Licenses[];
    refetch?: () => void;
    totalCountAndLimit?: { totalCount: number; size: number };
    currentPage: number;
    loading?: boolean;
};

export const SingleLicenseTable: React.FC<TSingleLicenseTableProps> = ({
    licenses = [],
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
        data: licenses,
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
            ? (currentPage - 1) * pagination.pageSize + licenses.length
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
                                                        ? "text-right pr-24"
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
                            <SingleLicensesPagination
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