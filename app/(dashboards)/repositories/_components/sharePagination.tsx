import React from "react";
import { GenericPagination } from "@/components/GenericPagination";
import { SharePaginationProps } from "@/types/repo.types";

export function SharePagination({
    currentPage,
    totalPage,
    onPageChange,
}: SharePaginationProps) {
    return (
        <GenericPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
            basePath="/members"
        />
    );
}