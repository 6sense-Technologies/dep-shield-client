import { TSingleRepository } from './repo.types';

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
  dependencyId: string;
};

export type TDependenciesTableProps = {
  dependencies?: TSingleDependencies[];
  refetch?: () => void;
  totalCountAndLimit?: { totalCount: number | undefined; size: number };
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
  repos?: TSingleRepository[];
  refetch?: () => void;
  totalCountAndLimit?: { totalCount: number; size: number };
  currentPage: number;
  loading?: boolean;
};

//   nayeem
export type TDependency = TSingleDependency[];

export interface TSingleDependency {
  requiredVersion: any;
  dependencyType: any;
  _id: string;
  dependencyId: DependencyId;
  repositoryId: string;
  __v: number;
  createdAt: string;
  installedVersion: string;
  parent: any;
  updatedAt: string;
  isDeleted: boolean;
}

export interface DependencyId {
  _id: string;
  dependencyName: string;
  __v: number;
  createdAt: string;
  ecosystem: string;
  isDeleted: boolean;
  maintainers: Maintainer[];
  updatedAt: string;
  currentVersion: string;
  description: string;
  evaluation: Evaluation;
  homepage: string;
  lastPublishDate: string;
  license: string;
  npm: string;
  repository: string;
  score: Score;
}

export interface Maintainer {
  name: string;
  email: string;
  _id: string;
}

export interface Evaluation {
  quality: Quality;
  popularity: Popularity;
  maintenance: Maintenance;
}

export interface Quality {
  carefulness: number;
  tests: number;
  health: number;
  branding: number;
}

export interface Popularity {
  communityInterest: number;
  downloadsCount: number;
  downloadsAcceleration: number;
  dependentsCount: number;
}

export interface Maintenance {
  releasesFrequency: number;
  commitsFrequency: number;
  openIssues: number;
  issuesDistribution: number;
}

export interface Score {
  final: number;
  detail: Detail;
}

export interface Detail {
  quality: number;
  popularity: number;
  maintenance: number;
}

export interface TAllDependencies {
  data: TSingleDependencies[];
  count: number;
}

export interface TSingleDependencies {
  vulnerabilityCount: number;
  license?: string;
  dependencyId: string;
  _id: string;
  name: string;
  quality?: number;
  popularity?: number;
}

export interface IDependencyDetails {
  _id: string;
  dependencyName: string;
  __v: number;
  createdAt: string;
  ecosystem: string;
  isDeleted: boolean;
  maintainers: {
    name: string;
    email: string;
    _id: string;
  }[];
  updatedAt: string;
  currentVersion: string;
  description: string;
  evaluation: {
    quality: {
      carefulness: number;
      tests: number;
      health: number;
      branding: number;
    };
    popularity: {
      communityInterest: number;
      downloadsCount: number;
      downloadsAcceleration: number;
      dependentsCount: number;
    };
    maintenance: {
      releasesFrequency: number;
      commitsFrequency: number;
      openIssues: number;
      issuesDistribution: number;
    };
  };
  homepage: string;
  lastPublishDate: string;
  license: string;
  npm: string;
  repository: string;
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
}
