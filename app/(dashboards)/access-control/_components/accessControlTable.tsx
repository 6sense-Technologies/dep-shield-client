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
import { AccessControlPagination } from "./accessControlPagination";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

type AccessControl = {
    name: string;
    email: string;
    shareTime: string;
    avatarUrl?: string;
};

const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length === 1) {
        return parts[0][0].toUpperCase();
    }
    if (parts.length === 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
};

const formatShareTime = (shareTime: string) => {
    const [time, date] = shareTime.split(".");
    return (
        <div className="flex flex-col">
            <span className="text-black">{time}</span>
            <span className="text-inputFooterColor pt-1">{date}</span>
        </div>
    );
};

type TAccessControlTableProps = {
    controls?: AccessControl[];
    refetch?: () => void;
    totalCountAndLimit?: { totalCount: number; size: number };
    currentPage: number;
    loading?: boolean;
};

export const AccessControlTable: React.FC<TAccessControlTableProps> = ({
    controls = [],
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [, setSelectedUser] = useState<AccessControl | null>(null);
    const totalPages = totalCountAndLimit.totalCount
        ? Math.ceil(totalCountAndLimit.totalCount / totalCountAndLimit.size)
        : 0;

    const handleRemoveClick = (user: AccessControl) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleConfirmRemove = () => {
        // Add your logic to remove access for the selected user here
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const columns: ColumnDef<AccessControl>[] = [
        {
            accessorKey: "name",
            header: () => <div className="text-bold">Name</div>,
            cell: ({ row }: { row: any }) => (
                <div className="flex items-center">
                    <Avatar className="w-8 h-8 mr-2">
                        {row.original.avatarUrl ? (
                            <AvatarImage src={row.original.avatarUrl} alt={row.original.name} />
                        ) : (
                            <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
                        )}
                    </Avatar>
                    <span className="text-medium">{row.getValue("name") || "-"}</span>
                </div>
            ),
        },
        {
            accessorKey: "email",
            header: () => <div className="text-bold">Email</div>,
            cell: ({ row }: { row: any }) => (
                <div className="text-medium">{row.getValue("email") || "-"}</div>
            ),
        },
        {
            accessorKey: "shareTime",
            header: () => <div className="text-bold">Share Time</div>,
            cell: ({ row }: { row: any }) => formatShareTime(row.getValue("shareTime")),
        },
        {
            id: "actions",
            header: () => <div className="text-bold text-start pr-4">Actions</div>,
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex items-center justify-end space-x-4 pr-4">
                    <Button variant="destructive" onClick={() => handleRemoveClick(row.original)}>Remove</Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: controls,
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
            ? (currentPageState - 1) * pagination.pageSize + controls.length
            : controls.length;

    return (
        <div className="w-full">
            {isLoading ? (
                <EmptyTableSkeleton />
            ) : (
                <>
                    <AlertDialog open={isModalOpen} onOpenChange={handleCloseModal}>
                        <AlertDialogContent className='bg-white'>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-destructive">Remove access</AlertDialogTitle>
                                <AlertDialogDescription className="text-inputFooterColor">
                                    Are you sure you want to revoke access for the selected user?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive text-white" onClick={handleConfirmRemove}>Remove</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
                                                    : header.column.id === "name"
                                                        ? "min-w-[300px]"
                                                        : header.column.id === "email"
                                                            ? "min-w-[200px]"
                                                            : header.column.id === "shareTime"
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
                                                            : cell.column.id === "email"
                                                                ? "text-start pl-4"
                                                                : cell.column.id === "shareTime"
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
                            <AccessControlPagination
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