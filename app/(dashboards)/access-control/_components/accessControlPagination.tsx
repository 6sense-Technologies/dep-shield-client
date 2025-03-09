import React from "react";
import { GenericPagination } from "@/components/GenericPagination";
import { AccessControlPaginationProps } from "@/types/AccessControl.types";

export function AccessControlPagination({
    currentPage,
    totalPage,
    onPageChange,
}: AccessControlPaginationProps) {
    return (
        <GenericPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
            basePath="/members"
        />
    );
}