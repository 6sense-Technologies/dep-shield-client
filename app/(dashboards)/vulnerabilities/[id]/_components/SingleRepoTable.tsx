import React from "react";
import { GenericTable } from "@/components/GenericTable";
import { Button } from "@/components/ui/button";
import { TSingleRepoTableProps } from "@/types/tableprops.types";
import { SingleRepoPagination } from "./SingleRepoPagination";
import { createColumns } from "@/components/ColumnDefinations";

const columnsProps = [
    {
        accessorKey: "repositoryName",
        header: "Repository Name",
        cell: (row: any) => <div className="text-medium">{row.getValue("repositoryName") || "-"}</div>,
    },
    {
        accessorKey: "actions",
        header: "Actions",
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

export const SingleRepoTable: React.FC<TSingleRepoTableProps> = ({
    repos = [],
    refetch,
    totalCountAndLimit = { totalCount: 0, size: 10 },
    currentPage,
    loading=false,
}) => {
    const columns = createColumns(columnsProps);

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
            PaginationComponent={SingleRepoPagination}
        />
    );
};