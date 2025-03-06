import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { DependenciesPaginationProps } from "@/types/dependencies.types";
import { useRouter } from "next/navigation";



const CustomPagination: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <div>{children}</div>;
};

export function AllDependenciesPagination({
    currentPage,
    totalPage,
    onPageChange,
}: DependenciesPaginationProps) {
    const router = useRouter();

    const getPagination = (): (number | string)[] => {
        const Dpagination: (number | string)[] = [];
        const DmaxPagesToShow = 3;
        let startPage = Math.max(1, currentPage - Math.floor(DmaxPagesToShow / 2));
        let endPage = Math.min(
            totalPage,
            currentPage + Math.floor(DmaxPagesToShow / 2)
        );

        if (endPage - startPage + 1 < DmaxPagesToShow) {
            if (currentPage < Math.ceil(DmaxPagesToShow / 2)) {
                endPage = Math.min(DmaxPagesToShow, totalPage);
            } else if (currentPage > totalPage - Math.floor(DmaxPagesToShow / 2)) {
                startPage = Math.max(totalPage - DmaxPagesToShow + 1, 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            Dpagination.push(i);
        }

        if (startPage > 1) {
            Dpagination.unshift("...");
            Dpagination.unshift(1);
        }

        if (endPage < totalPage) {
            Dpagination.push("...");
            Dpagination.push(totalPage);
        }

        return Dpagination;
    };

    const pagination = getPagination();

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
                                onPageChange(currentPage - 1);
                                router.push(`/members?page=${currentPage - 1}`);
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
                                    onPageChange(page);
                                    router.push(`/members?page=${page}`);
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
                                onPageChange(currentPage + 1);
                                router.push(`/members?page=${currentPage + 1}`);
                            }
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </CustomPagination>
    );
}