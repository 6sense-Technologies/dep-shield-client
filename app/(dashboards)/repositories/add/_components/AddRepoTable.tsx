import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { AddRepoPagination } from "./AddRepoPagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddRepositories, getRepoAddStatus } from "@/helpers/githubApp/githubApi";
import { GenericTable } from "@/components/GenericTable";

type Repository = {
    _id: string;
    name: string;
};

type TAddRepoTableProps = {
    repositories?: Repository[];
    refetch?: () => void;
    totalCountAndLimit?: { totalCount: number; size: number };
    currentPage: number;
    loading?: boolean;
    session?: any;
};

export const AddRepoTable: React.FC<TAddRepoTableProps> = ({
    repositories = [],
    refetch,
    totalCountAndLimit = { totalCount: 0, size: 10 },
    currentPage,
    loading=false,
    session,
}) => {
    const [addedRepos, setAddedRepos] = useState<{ [key: string]: boolean }>({});

    const {
        data: repoStatus,
    } = useQuery<any>({
        queryKey: ["repoStatus"],
        queryFn: () => getRepoAddStatus(session),
    });

    useEffect(() => {
        if (repoStatus?.repositories) {
            const initialAddedRepos: { [key: string]: boolean } = {};
            repoStatus.repositories.forEach((repo: any) => {
                if (repo.isSelected) {
                    initialAddedRepos[repo._id] = true;
                }
            });
            setAddedRepos(initialAddedRepos);
        }
    }, [repoStatus]);

    const addRepoMutation = useMutation({
        mutationFn: (data: string) => AddRepositories(session, data),
        onSuccess: (data, variables) => {
            console.log("Added");
            setAddedRepos((prev) => ({ ...prev, [variables]: true }));
        },
        onError: (error) => {
            console.error("Error adding repository:", error);
        },
    });

    const columns: ColumnDef<Repository>[] = [
        {
            accessorKey: "repoName",
            header: () => <div className="text-bold">Repository Name</div>,
            cell: ({ row }: { row: any }) => (
                <div className="text-medium">{row.getValue("repoName") || "-"}</div>
            ),
        },
        {
            id: "actions",
            header: () => <div className="text-bold text-start pr-4">Actions</div>,
            enableHiding: false,
            cell: ({ row }) => {
                const repoId = row.original._id;
                const added = addedRepos[repoId] || false;

                const handleAddClick = () => {
                    addRepoMutation.mutate(repoId);
                };

                return (
                    <div className="flex items-center justify-end space-x-4 pr-4">
                        <Button
                            variant={added ? "nonedisable" : "outline"}
                            size="xsExtended"
                            onClick={handleAddClick}
                            disabled={added}
                        >
                            {added ? "Added" : "Add"}
                        </Button>
                    </div>
                );
            },
        },
    ];

    const headerClassNames = {
        actions: "text-right w-[125px]",
        repoName: "min-w-[300px]",
    };

    const cellClassNames = {
        actions: "text-right",
        repoName: "pl-4 text-start",
    };

    return (
        <GenericTable
            columns={columns}
            data={repositories}
            refetch={refetch}
            totalCountAndLimit={totalCountAndLimit}
            currentPage={currentPage}
            loading={loading}
            headerClassNames={headerClassNames}
            cellClassNames={cellClassNames}
            PaginationComponent={AddRepoPagination}
        />
    );
};