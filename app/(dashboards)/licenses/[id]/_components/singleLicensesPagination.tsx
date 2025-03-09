import React from "react";
import { SLPaginationProps } from "@/types/licenses.types";
import { GenericPagination } from "@/components/GenericPagination";

export function SingleLicensesPagination({ currentPage, totalPage, onPageChange }: SLPaginationProps) {
    return (
        <GenericPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
            basePath="/members"
        />
    );
}