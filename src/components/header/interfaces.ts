import { ReactNode } from 'react';

export type HeaderProps = {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  breadcrumbItems?: BreadcrumbItem[];
  isSubmit?: boolean;
  goBack?: () => void;
  onRegister?: () => void;
  loading?: boolean;
};

export type BreadcrumbItem = {
  label: string | ReactNode;
  path?: string;
  icon?: React.ReactNode;
};
