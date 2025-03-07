import React from "react";
import { GenericPagination } from "@/components/GenericPagination";
import { RepoPaginationProps } from "@/types/repo.types";

export function RepoPagination({
    currentPage,
    totalPage,
    onPageChange,
}: RepoPaginationProps) {
    return (
        <GenericPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
            basePath="/repositories?tab=all"
        />
    );
}