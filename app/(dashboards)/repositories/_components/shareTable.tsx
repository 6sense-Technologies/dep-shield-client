import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SharePagination } from "./sharePagination";
import Image from 'next/image';
import { Github, Gitlab } from "lucide-react";
import CustomAlertDialog from "./CustomAlartDialog";
import Link from "next/link";
import { ShareData, TShareTableProps } from "@/types/repo.types";
import { GenericTable } from "@/components/GenericTable";

export const ShareTable: React.FC<TShareTableProps> = ({
    data = [],
    refetch,
    totalCountAndLimit = { totalCount: 0, size: 10 },
    currentPage,
    loading=false,
}) => {
    const columns: ColumnDef<ShareData>[] = [
        {
            accessorKey: "sharedBy",
            header: () => <div className="text-bold">Shared By</div>,
            cell: ({ row }: { row: any }) => (
                <div className="flex items-center">
                    <Avatar className="w-8 h-8 rounded-full mr-2">
                        <AvatarImage src={row.original.sharedBy.avatarUrl} alt={row.original.sharedBy.name} />
                        <AvatarFallback>{row.original.sharedBy.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{row.original.sharedBy.name}</span>
                </div>
            ),
        },
        {
            accessorKey: "sharedRepositories",
            header: () => <div className="text-bold">Shared Repositories</div>,
            cell: ({ row }: { row: any }) => (
                <div className="text-medium">{row.getValue("sharedRepositories") || "-"}</div>
            ),
        },
        {
            accessorKey: "platform",
            header: () => <div className="text-bold">Platform</div>,
            cell: ({ row }: { row: any }) => (
                <div className="flex items-center">
                    {row.original.platform === "GitHub" && <Github size={16} className="mr-2" />}
                    {row.original.platform === "GitLab" && <Gitlab size={16} className="mr-2" />}
                    {row.original.platform === "BitBucket" && (
                        <Image src="/logo/Bitbucket.svg" alt="BitBucket" width={16} height={16} className="mr-2" />
                    )}
                </div>
            ),
        },
        {
            id: "actions",
            header: () => <div className="text-bold text-start pr-4">Actions</div>,
            enableHiding: false,
            cell: () => (
                <div className="flex items-center justify-end space-x-4 pr-4">
                    <Link href={`/repositories/${12}/details`}><Button variant="outline">View</Button></Link>
                    <CustomAlertDialog trigger={<Button variant="destructive">Remove</Button>} />
                </div>
            ),
        },
    ];

    const headerClassNames = {
        actions: "text-right w-[225px]",
        sharedBy: "min-w-[300px]",
        sharedRepositories: "min-w-[200px]",
        platform: "min-w-[200px]",
    };

    const cellClassNames = {
        actions: "text-right",
        sharedBy: "pl-4 text-start",
        sharedRepositories: "text-start pl-4",
        platform: "pl-4 text-start",
    };

    return (
        <GenericTable
            columns={columns}
            data={data}
            refetch={refetch}
            totalCountAndLimit={totalCountAndLimit}
            currentPage={currentPage}
            loading={loading}
            headerClassNames={headerClassNames}
            cellClassNames={cellClassNames}
            PaginationComponent={SharePagination}
        />
    );
};