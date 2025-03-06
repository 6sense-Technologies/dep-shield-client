import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import { SharePaginationProps } from "@/types/repo.types";
  import { useRouter } from "next/navigation";
  

  const CustomPagination: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return <div>{children}</div>;
  };
  
  export function SharePagination({
    currentPage,
    totalPage,
    onPageChange,
  }: SharePaginationProps) {
    const router = useRouter();
  
    const getPagination = (): (number | string)[] => {
      const shpagination: (number | string)[] = [];
      const shmaxPagesToShow = 3;
      let startPage = Math.max(1, currentPage - Math.floor(shmaxPagesToShow / 2));
      let endPage = Math.min(
        totalPage,
        currentPage + Math.floor(shmaxPagesToShow / 2)
      );
  
      if (endPage - startPage + 1 < shmaxPagesToShow) {
        if (currentPage < Math.ceil(shmaxPagesToShow / 2)) {
          endPage = Math.min(shmaxPagesToShow, totalPage);
        } else if (currentPage > totalPage - Math.floor(shmaxPagesToShow / 2)) {
          startPage = Math.max(totalPage - shmaxPagesToShow + 1, 1);
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        shpagination.push(i);
      }
  
      if (startPage > 1) {
        shpagination.unshift("...");
        shpagination.unshift(1);
      }
  
      if (endPage < totalPage) {
        shpagination.push("...");
        shpagination.push(totalPage);
      }
  
      return shpagination;
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