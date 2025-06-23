import React from "react";
import { GenericPagination } from "@/components/GenericPagination";
import { MyRepoPaginationProps } from "@/types/repo.types";

export function MyRepoPagination({
    currentPage,
    totalPage,
    onPageChange,
}: MyRepoPaginationProps) {
    return (
        <GenericPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
            basePath="/members"
        />
    );
}