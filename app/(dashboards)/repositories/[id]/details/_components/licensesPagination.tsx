import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { LPaginationProps } from "@/types/licenses.types";
import { useRouter } from "next/navigation";


const CustomPagination: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <div>{children}</div>;
};

export function LicensesPagination({
    currentPage,
    totalPage,
    onPageChange,
}: LPaginationProps) {
    const router = useRouter();

    const getPagination = (): (number | string)[] => {
        const lpagination: (number | string)[] = [];
        const lmaxPagesToShow = 3;
        let lstartPage = Math.max(1, currentPage - Math.floor(lmaxPagesToShow / 2));
        let lendPage = Math.min(
            totalPage,
            currentPage + Math.floor(lmaxPagesToShow / 2)
        );

        if (lendPage - lstartPage + 1 < lmaxPagesToShow) {
            if (currentPage < Math.ceil(lmaxPagesToShow / 2)) {
                lendPage = Math.min(lmaxPagesToShow, totalPage);
            } else if (currentPage > totalPage - Math.floor(lmaxPagesToShow / 2)) {
                lstartPage = Math.max(totalPage - lmaxPagesToShow + 1, 1);
            }
        }

        for (let i = lstartPage; i <= lendPage; i++) {
            lpagination.push(i);
        }

        if (lstartPage > 1) {
            lpagination.unshift("...");
            lpagination.unshift(1);
        }

        if (lendPage < totalPage) {
            lpagination.push("...");
            lpagination.push(totalPage);
        }

        return lpagination;
    };

    const lpagination = getPagination();

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
                {lpagination.map((page, index) => (
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