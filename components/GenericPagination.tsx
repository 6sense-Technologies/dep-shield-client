import React from "react";
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

interface PaginationProps {
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
    basePath?: string;
}

const CustomPagination: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <div>{children}</div>;
};

export const GenericPagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPage,
    onPageChange,
    basePath,
}) => {
    const router = useRouter();

    const getPagination = (): (number | string)[] => {
        const pagination: (number | string)[] = [];
        const maxPagesToShow = 3;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(
            totalPage,
            currentPage + Math.floor(maxPagesToShow / 2)
        );

        if (endPage - startPage + 1 < maxPagesToShow) {
            if (currentPage < Math.ceil(maxPagesToShow / 2)) {
                endPage = Math.min(maxPagesToShow, totalPage);
            } else if (currentPage > totalPage - Math.floor(maxPagesToShow / 2)) {
                startPage = Math.max(totalPage - maxPagesToShow + 1, 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pagination.push(i);
        }

        if (startPage > 1) {
            pagination.unshift("...");
            pagination.unshift(1);
        }

        if (endPage < totalPage) {
            pagination.push("...");
            pagination.push(totalPage);
        }

        return pagination;
    };

    const pagination = getPagination();

    const getPageUrl = (page: number) => {
        const path = basePath || '';
        return path.includes('?') ? `${path}&page=${page}` : `${path}?page=${page}`;
    };

    const handlePageChange = (page: number) => {
        onPageChange(page);
        router.push(getPageUrl(page));
    };

    return (
        <CustomPagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className={`${currentPage === 1 ? "cursor-not-allowed text-subHeading" : "cursor-pointer"
                            }`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) {
                                handlePageChange(currentPage - 1);
                            }
                        }}
                    />
                </PaginationItem>
                {pagination.map((page, index) => (
                    <PaginationItem key={index}>
                        {typeof page === "number" ? (
                            <PaginationLink
                                className={`cursor-pointer ${currentPage === page ? "bg-white text-black" : ""
                                    }`}
                                isActive={currentPage === page}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(page);
                                }}
                            >
                                {page}
                            </PaginationLink>
                        ) : (
                            <PaginationEllipsis />
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        className={`${currentPage === totalPage ? "cursor-not-allowed text-subHeading" : "cursor-pointer"
                            }`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPage) {
                                handlePageChange(currentPage + 1);
                            }
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </CustomPagination>
    );
};