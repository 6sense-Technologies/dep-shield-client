import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { SingleLicensesPagination } from "./singleLicensesPagination";
import { getBadgeVariant } from "@/constants/globalFunctions";
import { SingleLicenses, TSingleLicenseTableProps } from "@/types/licenses.types";
import { GenericTable } from "@/components/GenericTable";

export const columns: ColumnDef<SingleLicenses>[] = [
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
        cell: () => (
            <div className="flex items-center justify-end space-x-4 pr-4">
                <ExternalLink size={16} className="cursor-pointer"/>
            </div>
        ),
    },
];

const headerClassNames = {
    actions: "text-right w-[150px]",
    repositoryName: "min-w-[300px]",
};

const cellClassNames = {
    actions: "text-right pr-24",
    repositoryName: "pl-4 text-start",
};


export const SingleLicenseTable: React.FC<TSingleLicenseTableProps> = ({
    licenses = [],
    refetch,
    totalCountAndLimit = { totalCount: 0, size: 10 },
    currentPage,
    loading=false,
}) => {
    return (
        <GenericTable
            columns={columns}
            data={licenses}
            refetch={refetch}
            totalCountAndLimit={totalCountAndLimit}
            currentPage={currentPage}
            loading={loading}
            headerClassNames={headerClassNames}
            cellClassNames={cellClassNames}
            PaginationComponent={SingleLicensesPagination}
        />
    );
};