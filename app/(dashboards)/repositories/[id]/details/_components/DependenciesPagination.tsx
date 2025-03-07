import React from "react";
import { GenericPagination } from "@/components/GenericPagination";

interface PaginationProps {
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
}

export function DependenciesPagination({
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