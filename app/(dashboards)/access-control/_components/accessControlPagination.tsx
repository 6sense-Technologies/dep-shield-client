import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import { AccessControlPaginationProps } from "@/types/AccessControl.types";
  import { useRouter } from "next/navigation";
  

  
  const CustomPagination: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return <div>{children}</div>;
  };
  
  export function AccessControlPagination({
    currentPage,
    totalPage,
    onPageChange,
  }: AccessControlPaginationProps) {
    const router = useRouter();
  
    const getPagination = (): (number | string)[] => {
      const ACpagination: (number | string)[] = [];
      const ACmaxPagesToShow = 3;
      let startPage = Math.max(1, currentPage - Math.floor(ACmaxPagesToShow / 2));
      let endPage = Math.min(
        totalPage,
        currentPage + Math.floor(ACmaxPagesToShow / 2)
      );
  
      if (endPage - startPage + 1 < ACmaxPagesToShow) {
        if (currentPage < Math.ceil(ACmaxPagesToShow / 2)) {
          endPage = Math.min(ACmaxPagesToShow, totalPage);
        } else if (currentPage > totalPage - Math.floor(ACmaxPagesToShow / 2)) {
          startPage = Math.max(totalPage - ACmaxPagesToShow + 1, 1);
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        ACpagination.push(i);
      }
  
      if (startPage > 1) {
        ACpagination.unshift("...");
        ACpagination.unshift(1);
      }
  
      if (endPage < totalPage) {
        ACpagination.push("...");
        ACpagination.push(totalPage);
      }
  
      return ACpagination;
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