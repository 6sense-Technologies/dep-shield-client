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
