import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import {RepoPaginationProps } from "@/types/repo.types";
  import { useRouter } from "next/navigation";
  

  const CustomPagination: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return <div>{children}</div>;
  };
  
  export function RepoPagination({
    currentPage,
    totalPage,
    onPageChange,
  }: RepoPaginationProps) {
    const router = useRouter();
  
    const getPagination = (): (number | string)[] => {
      const Repopagination: (number | string)[] = [];
      const RepomaxPagesToShow = 3;
      let startPage = Math.max(1, currentPage - Math.floor(RepomaxPagesToShow / 2));
      let endPage = Math.min(
        totalPage,
        currentPage + Math.floor(RepomaxPagesToShow / 2)
      );
  
      if (endPage - startPage + 1 < RepomaxPagesToShow) {
        if (currentPage < Math.ceil(RepomaxPagesToShow / 2)) {
          endPage = Math.min(RepomaxPagesToShow, totalPage);
        } else if (currentPage > totalPage - Math.floor(RepomaxPagesToShow / 2)) {
          startPage = Math.max(totalPage - RepomaxPagesToShow + 1, 1);
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        Repopagination.push(i);
      }
  
      if (startPage > 1) {
        Repopagination.unshift("...");
        Repopagination.unshift(1);
      }
  
      if (endPage < totalPage) {
        Repopagination.push("...");
        Repopagination.push(totalPage);
      }
  
      return Repopagination;
    };
  
    const Repopagination = getPagination();
  
    return (
      <CustomPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`${
                currentPage === 1 ? "cursor-not-allowed text-subHeading" : "cursor-pointer"
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  onPageChange(currentPage - 1);
                  router.push(`/repositories?tab=all&page=${currentPage - 1}`);
                }
              }}
            />
          </PaginationItem>
          {Repopagination.map((page, index) => (
            <PaginationItem key={index}>
              {typeof page === "number" ? (
                <PaginationLink
                  className={`cursor-pointer ${
                    currentPage === page ? "bg-white text-black" : ""
                  }`}
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                    router.push(`/repositories?tab=all&page=${page}`);
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
              className={`${
                currentPage === totalPage ? "cursor-not-allowed text-subHeading" : "cursor-pointer"
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPage) {
                  onPageChange(currentPage + 1);
                  router.push(`/repositories?tab=all&page=${currentPage + 1}`);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </CustomPagination>
    );
  }