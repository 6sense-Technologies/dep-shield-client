import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RepoPagination } from "./repoPagination";
import Link from "next/link";
import { getBadgeVariant } from "@/constants/globalFunctions";
import { Repository, TRepoTableProps } from "@/types/repo.types";
import { GenericTable } from "@/components/GenericTable";

const getSeverityCount = (vulnerabilities: { id: number; name: string; severity: string }[], severity: string) => {
    return vulnerabilities.filter(vuln => vuln.severity === severity).length;
};

export const RepoTable: React.FC<TRepoTableProps> = ({
    repos = [],
    refetch,
    totalCountAndLimit = { totalCount: 0, size: 10 },
    currentPage,
    loading=false,
}) => {
    const columns: ColumnDef<Repository>[] = [
        {
            accessorKey: "repoName",
            header: () => <div className="text-bold">Repository Name</div>,
            cell: ({ row }: { row: any }) => (
                <div className="text-medium">{row.getValue("repoName") || "-"}</div>
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
            accessorKey: "vulnerabilities",
            header: () => <div className="text-bold">Vulnerabilities</div>,
            cell: ({ row }: { row: any }) => {
                const vulnerabilities = row.original.vulnerabilities;
                if (!vulnerabilities || vulnerabilities.length === 0) {
                    return <div className="text-medium">-</div>;
                }
                const severities = ["Critical", "High", "Medium", "Low", "Unknown"];
                return (
                    <div className="flex flex-wrap gap-2">
                        {severities.map(severity => {
                            const count = getSeverityCount(vulnerabilities, severity);
                            return count > 0 ? (
                                <Badge key={severity} className={getBadgeVariant(severity)}>
                                    {severity} {count}
                                </Badge>
                            ) : null;
                        })}
                    </div>
                );
            },
        },
        {
            accessorKey: "sharingDetails",
            header: () => <div className="text-bold">Sharing Details</div>,
            cell: ({ row }: { row: any }) => {
                const sharingDetails = row.original.sharingDetails;
                if (!sharingDetails || sharingDetails.length === 0) {
                    return <div className="text-medium">-</div>;
                }
                return (
                    <div className="flex -space-x-2">
                        {sharingDetails.map((user: any) => (
                            <Avatar key={user.id} className="w-8 h-8">
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: () => <div className="text-bold text-start pr-4">Actions</div>,
            enableHiding: false,
            cell: () => (
                <div className="flex items-center justify-end space-x-4 pr-4">
                    <Link href={`/repositories/${12}/details`}><Button variant="outline">View</Button></Link>
                </div>
            ),
        },
    ];

    const headerClassNames = {
        actions: "text-right w-[115px]",
        repoName: "min-w-[300px]",
        totalVulnerabilities: "min-w-[200px]",
        sharingDetails: "min-w-[200px]",
    };

    const cellClassNames = {
        actions: "text-right",
        repoName: "pl-4 text-start",
        totalVulnerabilities: "text-start pl-4",
        vulnerabilities: "pl-4 text-start",
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
            PaginationComponent={RepoPagination}
        />
    );
};