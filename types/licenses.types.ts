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
  licenseId: string;
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

export type TLicensesTableProps = {
  licenses?: ISingleLicenseByRepoId[];
  refetch?: () => void;
  totalCountAndLimit?: { totalCount: number; size: number };
  currentPage: number;
  loading?: boolean;
  activeTab: string;
  repoId: string;
};

export type TSingleLicenseTableProps = {
  licenses?: SingleLicenses[];
  refetch?: () => void;
  totalCountAndLimit?: { totalCount: number; size: number };
  currentPage: number;
  loading?: boolean;
};

export interface ILicensesByRepoId {
  data: ISingleLicenseByRepoId[];
  count: number;
}

export interface ISingleLicenseByRepoId {
  dependencyCount: number;
  licenseId: string;
  _id: string;
  license: string;
  licenseRisk: string;
  licenseFamily: string;
}
