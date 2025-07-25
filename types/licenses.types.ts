import { TSingleRepository } from './repo.types';

export interface LPaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export type TAllLicensesTableProps = {
  licenses?: ISingleLicense[];
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
  licenses?: ISingleLicense[];
  refetch?: () => void;
  totalCountAndLimit?: { totalCount: number; size: number };
  currentPage: number;
  loading?: boolean;
  activeTab: string;
  repoId: string;
};

export type TSingleLicenseTableProps = {
  licenses?: TSingleRepository[];
  refetch?: () => void;
  totalCountAndLimit?: { totalCount: number; size: number };
  currentPage: number;
  loading?: boolean;
};

export interface IAllLicenses {
  data: ISingleLicense[];
  count: number;
}

export interface ISingleLicense {
  dependencyCount: number;
  licenseId: string;
  _id: string;
  license: string;
  licenseRisk: string;
  licenseFamily: string;
}

export interface ILicenseDetails {
  _id: string;
  licenseId: string;
  name: string;
  reference: string;
  detailsUrl: string;
  isDeprecatedLicenseId: boolean;
  referenceNumber: number;
  references: string[];
  isOsiApproved: boolean;
  licenseText: string;
  standardLicenseTemplate: string;
  licenseTextHtml: string;
  useCase: {
    category: string;
    licenseFamily: string;
    licenseRisk: string;
  };
  summary: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
