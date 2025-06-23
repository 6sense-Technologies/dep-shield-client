import React from "react";
import { GenericPagination } from "@/components/GenericPagination";
import { DependenciesPaginationProps } from "@/types/dependencies.types";

export function AllDependenciesPagination({
    currentPage,
    totalPage,
    onPageChange,
}: DependenciesPaginationProps) {
    return (
        <GenericPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
            basePath="/members"
        />
    );
}