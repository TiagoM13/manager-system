import { ReactNode } from 'react';

import { BreadcrumbItem } from '@/interfaces';

export type HeaderProps = {
  title?: string;
  actionLabel?: string;
  breadcrumbItems?: BreadcrumbItem[];
  isSubmit?: boolean;
  goBack?: () => void;
  onRegister?: () => void;
  loading?: boolean;
};
