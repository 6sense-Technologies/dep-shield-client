export interface SinglePaginationProps {
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
  }

 export type Repository = {
    repositoryName: string;
};

  export type SecondTableData = {
    key: string;
    value: string;
};

export type FirstTableData = {
    key: string;
    value: string;
};

export type FirstTabTableProps = {
    data: FirstTableData[];
};
