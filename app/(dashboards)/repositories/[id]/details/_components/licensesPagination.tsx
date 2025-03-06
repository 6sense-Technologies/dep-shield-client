import React from "react";
import { GenericPagination } from "@/components/GenericPagination";
import { LPaginationProps } from "@/types/licenses.types";

export const LicensesPagination: React.FC<LPaginationProps> = ({
    currentPage,
    totalPage,
    onPageChange,
}) => {
    return (
        <GenericPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
            basePath="/members"
        />
    );
};