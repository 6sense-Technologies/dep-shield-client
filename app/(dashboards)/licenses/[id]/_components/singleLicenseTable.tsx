import { GenericTable } from "@/components/GenericTable";
import { Badge } from "@/components/ui/badge";
import { getBadgeVariant } from "@/constants/globalFunctions";
import { TSingleLicenseTableProps } from "@/types/licenses.types";
import { TSingleRepository } from "@/types/repo.types";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import React from "react";
import { SingleLicensesPagination } from "./singleLicensesPagination";

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
    loading = false,
    licenseDetails
}) => {
    const columns: ColumnDef<TSingleRepository>[] = [
        {
            accessorKey: "repositoryName",
            header: () => <div className="text-bold">Repositories</div>,
            cell: ({ row }) => (
                <div className="text-medium">{row?.original?.repoName || "-"}</div>
            ),
        },
        {
            accessorKey: "licenseRisk",
            header: () => <div className="text-bold">License Risk</div>,
            cell: () => {
                const licenseRisk = licenseDetails?.useCase?.licenseRisk || 'Unknown';
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
            cell: () => (
                <div className="text-medium">{licenseDetails?.useCase?.licenseFamily || "-"}</div>
            ),
        },
        {
            id: "actions",
            header: () => <div className="text-bold text-start pr-4">Actions</div>,
            enableHiding: false,
            cell: () => (
                <div className="flex items-center justify-end space-x-4 pr-4">
                    <ExternalLink size={16} className="cursor-pointer" />
                </div>
            ),
        },
    ];
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