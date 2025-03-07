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
    variant?: "default" | "link" | "submit" | "secondary" | "outline" | "destructive" | "ghost" | "greenish" | "light" | "extralight" | "dark" | null;
    className?: string;
  };
  
  export type Repository = {
    repositoryName: string;
    totalVulnerabilities: number;
    vulnerabilities: { id: number; name: string; severity: string }[];
    sharingDetails: { id: number; name: string; avatarUrl: string }[];
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
