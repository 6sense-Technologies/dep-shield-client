import React from "react";
import { GenericPagination } from "@/components/GenericPagination";
import { SingDepPaginationProps } from "@/types/dependencies.types";

export function SingleDepPagination({
    currentPage,
    totalPage,
    onPageChange,
}: SingDepPaginationProps) {
    return (
        <GenericPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
            basePath="/members"
        />
    );
}