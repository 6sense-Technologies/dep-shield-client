import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import { SingDepPaginationProps } from "@/types/dependencies.types";
  import { useRouter } from "next/navigation";
  

  
  const CustomPagination: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return <div>{children}</div>;
  };
  
  export function SingleDepPagination({
    currentPage,
    totalPage,
    onPageChange,
  }: SingDepPaginationProps) {
    const router = useRouter();
  
    const getPagination = (): (number | string)[] => {
      const SDpagination: (number | string)[] = [];
      const SDmaxPagesToShow = 3;
      let startPage = Math.max(1, currentPage - Math.floor(SDmaxPagesToShow / 2));
      let endPage = Math.min(
        totalPage,
        currentPage + Math.floor(SDmaxPagesToShow / 2)
      );
  
      if (endPage - startPage + 1 < SDmaxPagesToShow) {
        if (currentPage < Math.ceil(SDmaxPagesToShow / 2)) {
          endPage = Math.min(SDmaxPagesToShow, totalPage);
        } else if (currentPage > totalPage - Math.floor(SDmaxPagesToShow / 2)) {
          startPage = Math.max(totalPage - SDmaxPagesToShow + 1, 1);
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        SDpagination.push(i);
      }
  
      if (startPage > 1) {
        SDpagination.unshift("...");
        SDpagination.unshift(1);
      }
  
      if (endPage < totalPage) {
        SDpagination.push("...");
        SDpagination.push(totalPage);
      }
  
      return SDpagination;
    };
  
    const pagination = getPagination();
  
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
                  router.push(`/members?page=${currentPage - 1}`);
                }
              }}
            />
          </PaginationItem>
          {pagination.map((page, index) => (
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
              className={`${
                currentPage === totalPage ? "cursor-not-allowed text-subHeading" : "cursor-pointer"
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