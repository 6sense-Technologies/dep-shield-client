import React from "react";
import { GenericPagination } from "@/components/GenericPagination";
import { PaginationProps } from "@/types/Vulnerability.types";

export function VulnabilitiesPagination({
    currentPage,
    totalPage,
    onPageChange,
}: PaginationProps) {
    return (
        <GenericPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
            basePath="/members"
        />
    );
}