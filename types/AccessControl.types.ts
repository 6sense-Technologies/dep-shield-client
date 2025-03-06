export interface AccessControlPaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export type AccessControlSearchAreaProps = {
  empty?: boolean;
};

export type AccessControl = {
  name: string;
  email: string;
  shareTime: string;
  avatarUrl?: string;
};

export type RemoveAllModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

