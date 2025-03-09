import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { AllLicensesPagination } from "./AllLicensesPagiantion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getBadgeVariant } from "@/constants/globalFunctions";
import { License, TAllLicensesTableProps } from "@/types/licenses.types";
import { GenericTable } from "@/components/GenericTable";

export const AllLicensesTable: React.FC<TAllLicensesTableProps> = ({
    licenses = [],
    refetch,
    totalCountAndLimit = { totalCount: 0, size: 10 },
    currentPage,
    loading=false,
}) => {
    const columns: ColumnDef<License>[] = [
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
                                <Badge className="inline-flex items-center gap-x-2 text-black bg-white border-lightborderColor hover:bg-white hover:cursor-pointer font-normal">
                                    {repos[0]}
                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                </Badge>
                            </>
                        ) : (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Badge className="bg-white text-black hover:bg-white border-lightborderColor font-normal">+{repos.length}</Badge>
                                    </TooltipTrigger>
                                    <TooltipContent className="p-4 text-black bg-white border font-normal">
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
            cell: () => (
                <div className="flex items-center justify-end space-x-4 pr-4">
                    <Link href={`/licenses/${12}`}><Button variant="outline">View</Button></Link>
                </div>
            ),
        },
    ];

    const headerClassNames = {
        actions: "text-right w-[115px]",
        name: "min-w-[300px]",
        licenseRisk: "min-w-[200px]",
        dependencies: "min-w-[200px]",
        licenseFamily: "min-w-[200px]",
    };

    const cellClassNames = {
        actions: "text-right",
        name: "pl-4 text-start",
        licenseRisk: "text-start pl-4",
        dependencies: "pl-4 text-start",
        licenseFamily: "pl-4 text-start",
    };

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
            PaginationComponent={AllLicensesPagination}
        />
    );
};