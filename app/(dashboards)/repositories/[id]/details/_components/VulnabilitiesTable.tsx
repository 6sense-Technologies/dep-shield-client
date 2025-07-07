import { createColumns } from "@/components/ColumnDefinations";
import { GenericTable } from "@/components/GenericTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBadgeVariant } from "@/constants/globalFunctions";
import { TVulnerabilityTableProps } from "@/types/Vulnerability.types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

const columnsProps = [
    {
        accessorKey: "name",
        header: "Name",
        cell: (row: any) => {
            console.log(' row:', row)
            return (
                <div className="text-medium">{row.getValue("name") || "-"}</div>
            )
        }
    },
    {
        accessorKey: "discovered",
        header: "Discovered",
        cell: (row: any) => <div className="text-medium">{new Date(row.getValue("discovered"))?.toLocaleDateString('en-GB').replace(/\//g, '-') || "-"}</div>
    },
    {
        accessorKey: "severity",
        header: "Severity (CVSS3)",
        cell: (row: any) => <Badge className={getBadgeVariant(row.getValue("severity"))}>{row.getValue("severity") ?? '-'}</Badge>
    },
    {
        accessorKey: "severity2",
        header: "Severity (CVSS2)",
        cell: (row: any) => <Badge className={getBadgeVariant(row.getValue("severity2"))}>{row.getValue("severity2") ?? '-'}</Badge>
    },
    {
        accessorKey: "dependencyName",
        header: "Dependencies",
        cell: (row: any) => (
            <Badge className="inline-flex items-center gap-1 bg-white text-black hover:bg-white text-nowrap font-normal">
                {row.getValue("dependencyName")} <ExternalLink size={16} />
            </Badge>
        )
    },
    {
        accessorKey: "exploited",
        header: "Exploited (CISA)",
        cell: (row: any) => <div className="text-medium">{row.getValue("exploited") || "-"}</div>
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: () => (
            <div className="flex items-center justify-end space-x-4 pr-4">
                <Link href={`/vulnerabilities/${12}`}>
                    <Button variant="outline">View</Button>
                </Link>
            </div>
        )
    }
];

const headerClassNames = {
    actions: "text-right w-[110px]",
    name: "min-w-[300px]",
    discovered: "min-w-[200px]",
    severity: "min-w-[200px]",
    dependency: "min-w-[200px]"
};

const cellClassNames = {
    actions: "text-right",
    name: "pl-4 text-start",
    discovered: "text-start pl-4",
    severity: "pl-4 text-start",
    dependency: "pl-4 text-start"
};

export const VulnerabilityTable: React.FC<TVulnerabilityTableProps> = ({
    vulnerabilities,
    refetch,
    totalCountAndLimit = { totalCount: 0, size: 10 },
    currentPage,
    loading = false,
    activeTab,
    repoId
}) => {
    const columns = createColumns(columnsProps);

    return (
        <GenericTable
            columns={columns}
            //@ts-ignore
            data={vulnerabilities}
            refetch={refetch}
            totalCountAndLimit={totalCountAndLimit}
            currentPage={currentPage}
            loading={loading}
            headerClassNames={headerClassNames}
            cellClassNames={cellClassNames}
            basePath={`/repositories/${repoId}/details?tab=${activeTab}`}
        />
    );
};
