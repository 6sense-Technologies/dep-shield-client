import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { SingleDepPagination } from "./SingleDepPagination";
import { SingleDependencies, TSingleDepTableProps } from "@/types/dependencies.types";
import { GenericTable } from "@/components/GenericTable";

export const SingleDepTable: React.FC<TSingleDepTableProps> = ({
    repos = [],
    refetch,
    totalCountAndLimit = { totalCount: 0, size: 10 },
    currentPage,
    loading=false,
}) => {
    const columns: ColumnDef<SingleDependencies>[] = [
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

    const headerClassNames = {
        actions: "text-right w-[115px]",
        repositoryName: "min-w-[300px]",
    };

    const cellClassNames = {
        actions: "text-right pr-48",
        repositoryName: "pl-4 text-start",
    };

    return (
        <GenericTable
            columns={columns}
            data={repos}
            refetch={refetch}
            totalCountAndLimit={totalCountAndLimit}
            currentPage={currentPage}
            loading={loading}
            headerClassNames={headerClassNames}
            cellClassNames={cellClassNames}
            PaginationComponent={SingleDepPagination}
        />
    );
};