import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import { SinglePaginationProps } from "@/types/tableprops.types";
  import { useRouter } from "next/navigation";
  

  
  const CustomPagination: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return <div>{children}</div>;
  };
  
  export function SingleRepoPagination({
    currentPage,
    totalPage,
    onPageChange,
  }: SinglePaginationProps) {
    const router = useRouter();
  
    const getPagination = (): (number | string)[] => {
      const Spagination: (number | string)[] = [];
      const SmaxPagesToShow = 3;
      let startPage = Math.max(1, currentPage - Math.floor(SmaxPagesToShow / 2));
      let endPage = Math.min(
        totalPage,
        currentPage + Math.floor(SmaxPagesToShow / 2)
      );
  
      if (endPage - startPage + 1 < SmaxPagesToShow) {
        if (currentPage < Math.ceil(SmaxPagesToShow / 2)) {
          endPage = Math.min(SmaxPagesToShow, totalPage);
        } else if (currentPage > totalPage - Math.floor(SmaxPagesToShow / 2)) {
          startPage = Math.max(totalPage - SmaxPagesToShow + 1, 1);
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        Spagination.push(i);
      }
  
      if (startPage > 1) {
        Spagination.unshift("...");
        Spagination.unshift(1);
      }
  
      if (endPage < totalPage) {
        Spagination.push("...");
        Spagination.push(totalPage);
      }
  
      return Spagination;
    };
  
    const Spagination = getPagination();
  
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
          {Spagination.map((page, index) => (
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