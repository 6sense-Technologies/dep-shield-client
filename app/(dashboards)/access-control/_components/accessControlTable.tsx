import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AccessControlPagination } from "./accessControlPagination";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { formatShareTime, getInitials } from "@/constants/globalFunctions";
import { AccessControl, TAccessControlTableProps } from "@/types/AccessControl.types";
import { GenericTable } from "@/components/GenericTable";

export const AccessControlTable: React.FC<TAccessControlTableProps> = ({
    controls = [],
    refetch,
    totalCountAndLimit = { totalCount: 0, size: 10 },
    currentPage,
    loading=false,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [, setSelectedUser] = useState<AccessControl | null>(null);

    const handleRemoveClick = (user: AccessControl) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleConfirmRemove = () => {
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

    const headerClassNames = {
        actions: "text-right w-[115px]",
        name: "min-w-[300px]",
        email: "min-w-[200px]",
        shareTime: "min-w-[200px]",
    };

    const cellClassNames = {
        actions: "text-right",
        name: "pl-4 text-start",
        email: "text-start pl-4",
        shareTime: "pl-4 text-start",
    };

    return (
        <div className="w-full">
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
            <GenericTable
                columns={columns}
                data={controls}
                refetch={refetch}
                totalCountAndLimit={totalCountAndLimit}
                currentPage={currentPage}
                loading={loading}
                headerClassNames={headerClassNames}
                cellClassNames={cellClassNames}
                PaginationComponent={AccessControlPagination}
            />
        </div>
    );
};