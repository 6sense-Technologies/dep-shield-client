export interface DependenciesPaginationProps {
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
}

export type Dependency = {
    name: string;
    totalVulnerabilities: number;
    vulnerabilityPriority: string[];
    licenses: string;
    health: {
        popularity: number;
        contribution: number;
    };
};

export type TDependenciesTableProps = {
    dependencies?: Dependency[];
    refetch?: () => void;
    totalCountAndLimit?: { totalCount: number; size: number };
    currentPage: number;
    loading?: boolean;
};

export interface SingDepPaginationProps {
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
  }


 export type SingleDependencies = {
    repositoryName: string;
};


 export type TSingleDepTableProps = {
      repos?: SingleDependencies[];
      refetch?: () => void;
      totalCountAndLimit?: { totalCount: number; size: number };
      currentPage: number;
      loading?: boolean;
  };