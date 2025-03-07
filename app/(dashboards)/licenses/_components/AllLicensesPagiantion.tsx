import React from "react";
import { GenericPagination } from "@/components/GenericPagination";
import { LPaginationProps } from "@/types/licenses.types";

export function AllLicensesPagination({
    currentPage,
    totalPage,
    onPageChange,
}: LPaginationProps) {
    return (
        <GenericPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
            basePath="/members"
        />
    );
}