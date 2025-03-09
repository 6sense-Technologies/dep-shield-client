import React from "react";

import { SinglePaginationProps } from "@/types/tableprops.types";
import { GenericPagination } from "@/components/GenericPagination";

export function SingleRepoPagination({ currentPage, totalPage, onPageChange }: SinglePaginationProps) {
    return (
        <GenericPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
            basePath="/members"
        />
    );
}