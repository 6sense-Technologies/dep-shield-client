export interface DisableModalProps {
  trigger: React.ReactNode;
  // togglefn: (data: string) => any;
}

export interface MyRepoPaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export interface IHeadingProps {
  title: string;
  subTitle?: string;
  titleclassName?: string;
  subTitleClassName?: string;
  className?: string;
  showButton?: boolean;
  session?: any;
}

export interface RepoPaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export type RepoSearchbarProps = {
  placeholder?: string;
  name?: string;
  btntext?: string;
  variant?:
    | 'default'
    | 'link'
    | 'submit'
    | 'secondary'
    | 'outline'
    | 'destructive'
    | 'ghost'
    | 'greenish'
    | 'light'
    | 'extralight'
    | 'dark'
    | null;
  className?: string;
};

export type Repository = {
  repositoryName: string;
  totalVulnerabilities?: number;
  vulnerabilities?: { id: number; name: string; severity: string }[];
  sharingDetails?: { id: number; name: string; avatarUrl: string }[];
};

export interface SharePaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export type ShareData = {
  sharedBy: { name: string; avatarUrl: string };
  sharedRepositories: number;
  platform: string;
};

export type TShareTableProps = {
  data?: ShareData[];
  refetch?: () => void;
  totalCountAndLimit?: { totalCount: number; size: number };
  currentPage: number;
  loading?: boolean;
};

export type TMyRepoTableProps = {
  repos?: Repository[];
  refetch?: () => void;
  totalCountAndLimit?: { totalCount: number; size: number };
  currentPage: number;
  loading?: boolean;
};

export type TRepoTableProps = {
  repos?: Repository[];
  refetch?: () => void;
  totalCountAndLimit?: { totalCount: number; size: number };
  currentPage: number;
  loading?: boolean;
};

export interface IHeadingProps {
  title: string;
  subTitle?: string;
  titleclassName?: string;
  subTitleClassName?: string;
  className?: string;
  hoverTitle?: string;
}

export interface RepositoryBranches {
  data: RepositoryBranch[];
  count: number;
}
export interface RepositoryBranch {
  name: string;
}
export interface RepositoryDetails {
  repoName: string;
  repoUrl: string;
  defaultBranch: string;
  _id: string;
}

export interface TAllRepositories {
  data: TSingleRepository[];
  count: number;
}

export interface TSingleRepository {
  _id: string;
  user: string;
  repoUrl: string;
  __v: number;
  createdAt: string;
  defaultBranch: string;
  htmlUrl: string;
  isDeleted: boolean;
  isPrivate: boolean;
  isSelected: boolean;
  owner: string;
  ownerType: string;
  repoDescription: any;
  repoName: string;
  updatedAt: string;
  gitHubRepoId: number;
}
