export interface LPaginationProps {
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
}

export type License = {
    name: string;
    licenseRisk: string;
    dependencies: number;
    licenseFamily: string;
    affectedRepositories: string[];
};

export type TAllLicensesTableProps = {
    licenses?: License[];
    refetch?: () => void;
    totalCountAndLimit?: { totalCount: number; size: number };
    currentPage: number;
    loading?: boolean;
};

export interface SLPaginationProps {
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
  }
  

  export type SingleLicenses = {
      repositoryName: string;
      licenseRisk: string;
      licenseFamily: string;
  };

  export type SubLicense = {
      name: string;
      licenseRisk: string;
      dependencies: number;
      licenseFamily: string;
  };
  
  export type TLicensesTableProps = {
      licenses?: SubLicense[];
      refetch?: () => void;
      totalCountAndLimit?: { totalCount: number; size: number };
      currentPage: number;
      loading?: boolean;
  };
  
  export type TSingleLicenseTableProps = {
      licenses?: SingleLicenses[];
      refetch?: () => void;
      totalCountAndLimit?: { totalCount: number; size: number };
      currentPage: number;
      loading?: boolean;
  };


  
