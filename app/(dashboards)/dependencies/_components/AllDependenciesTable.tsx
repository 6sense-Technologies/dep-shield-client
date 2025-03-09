import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Handshake } from "lucide-react";
import Link from "next/link";
import { AllDependenciesPagination } from "./AllDependenciesPagination";
import { getBadgeVariant, getHealthBadgeVariant } from "@/constants/globalFunctions";
import { Dependency, TDependenciesTableProps } from "@/types/dependencies.types";
import { GenericTable } from "@/components/GenericTable";

export const AllDependenciesTable: React.FC<TDependenciesTableProps> = ({
    dependencies = [],
    refetch,
    totalCountAndLimit = { totalCount: 0, size: 10 },
    currentPage,
    loading=false,
}) => {
    const columns: ColumnDef<Dependency>[] = [
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
            cell: () => (
                <div className="flex items-center justify-end space-x-4 pr-4">
                    <Link href={`/dependencies/${12}`}><Button variant="outline">View</Button></Link>
                </div>
            ),
        },
    ];

    const headerClassNames = {
        actions: "text-right w-[110px]",
        name: "min-w-[300px]",
        totalVulnerabilities: "min-w-[200px]",
        vulnerabilityPriority: "min-w-[200px]",
        licenses: "min-w-[200px]",
        health: "min-w-[200px]",
    };

    const cellClassNames = {
        actions: "text-right",
        name: "pl-4 text-start",
        totalVulnerabilities: "text-start pl-4",
        vulnerabilityPriority: "pl-4 text-start",
        licenses: "pl-4 text-start",
        health: "pl-4 text-start",
    };

    return (
        <GenericTable
            columns={columns}
            data={dependencies}
            refetch={refetch}
            totalCountAndLimit={totalCountAndLimit}
            currentPage={currentPage}
            loading={loading}
            headerClassNames={headerClassNames}
            cellClassNames={cellClassNames}
            PaginationComponent={AllDependenciesPagination}
        />
    );
};